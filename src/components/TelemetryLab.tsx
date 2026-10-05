import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Gauge, 
  Radio, 
  Zap, 
  Info,
  Bell,
  Sparkles
} from 'lucide-react';

export const TelemetryLab: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [frequencyHz, setFrequencyHz] = useState<number>(30); // 10, 30, or 60 Hz
  const [simulatedIncident, setSimulatedIncident] = useState<'normal' | 'geofence_breach' | 'hard_braking'>('normal');

  // Live telemetry state
  const [currentSpeed, setCurrentSpeed] = useState<number>(64);
  const [rpm, setRpm] = useState<number>(2450);
  const [radarDistance, setRadarDistance] = useState<number>(42);
  const [latencyMs, setLatencyMs] = useState<number>(18);
  const [packetsReceived, setPacketsReceived] = useState<number>(1420);
  const [batteryHealth, setBatteryHealth] = useState<number>(94);
  const [geofenceStatus, setGeofenceStatus] = useState<'Secure' | 'Warning' | 'Breach'>('Secure');
  const [recentAlerts, setRecentAlerts] = useState<{ id: string; time: string; type: string; message: string }[]>([
    { id: '1', time: '10:42:15', type: 'info', message: 'Socket connection established (WSS 60fps telemetry pipeline).' },
    { id: '2', time: '10:42:18', type: 'success', message: 'Vehicle within designated Pune Corridor Geofence.' }
  ]);

  // Position on simulated 2D radar track (0 to 100)
  const [vehiclePos, setVehiclePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [angle, setAngle] = useState<number>(0);

  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) {
      if (tickRef.current) cancelAnimationFrame(tickRef.current);
      return;
    }

    const intervalMs = Math.round(1000 / frequencyHz);

    const intervalId = window.setInterval(() => {
      // Update vehicle orbital angle
      setAngle((prev) => (prev + 0.05) % (Math.PI * 2));

      // Packet counter
      setPacketsReceived((prev) => prev + 1);

      // Jitter latency slightly (14 - 22ms)
      const currentLat = Math.floor(14 + Math.random() * 8);
      setLatencyMs(currentLat);

      if (simulatedIncident === 'geofence_breach') {
        // Push vehicle outside polygon
        setVehiclePos({ x: 88, y: 22 });
        setGeofenceStatus('Breach');
        setCurrentSpeed(78);
        setRpm(3100);
      } else if (simulatedIncident === 'hard_braking') {
        setVehiclePos(() => ({
          x: 50 + Math.sin(angle) * 30,
          y: 50 + Math.cos(angle) * 30
        }));
        setCurrentSpeed((prev) => Math.max(12, prev - 4));
        setRpm(1200);
        setRadarDistance(8);
      } else {
        // Normal smooth navigation
        const newX = 50 + Math.sin(angle) * 28 + (Math.random() - 0.5) * 2;
        const newY = 50 + Math.cos(angle) * 28 + (Math.random() - 0.5) * 2;
        setVehiclePos({ x: newX, y: newY });
        setGeofenceStatus('Secure');
        
        // Minor natural speed variance
        setCurrentSpeed((prev) => {
          const delta = (Math.random() - 0.5) * 3;
          return Math.min(85, Math.max(45, Math.round(prev + delta)));
        });

        setRpm((prev) => Math.round(2200 + (currentSpeed * 12) + (Math.random() - 0.5) * 60));
        setRadarDistance(() => Math.round(35 + Math.sin(angle) * 15));
      }
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [isRunning, frequencyHz, simulatedIncident, angle, currentSpeed]);

  const triggerBreach = () => {
    setSimulatedIncident('geofence_breach');
    setGeofenceStatus('Breach');
    const newAlert = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString(),
      type: 'warning',
      message: 'CRITICAL: Vehicle breached Perimeter Zone 04 (Outer Ring). Geofence polygon alert dispatched.'
    };
    setRecentAlerts((prev) => [newAlert, ...prev.slice(0, 4)]);
  };

  const triggerBraking = () => {
    setSimulatedIncident('hard_braking');
    const newAlert = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString(),
      type: 'warning',
      message: 'TELEMETRY: Rapid deceleration detected (-7.2 m/s²). ADAS Collision Avoidance pinged.'
    };
    setRecentAlerts((prev) => [newAlert, ...prev.slice(0, 4)]);
  };

  const resetSimulation = () => {
    setSimulatedIncident('normal');
    setGeofenceStatus('Secure');
    setCurrentSpeed(64);
    setRadarDistance(42);
    setRecentAlerts((prev) => [
      {
        id: Date.now().toString(),
        time: new Date().toLocaleTimeString(),
        type: 'info',
        message: 'Telemetry simulation normalized. Nominal corridor flight.'
      },
      ...prev.slice(0, 4)
    ]);
  };

  return (
    <section id="telemetry-lab" className="py-20 bg-[#0a0e17] text-left">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-orange-500 tracking-tight">
            ADAS Telemetry Lab
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Interactive simulation of real-time vehicle monitoring engineered at Starkenn Technologies. Test 60fps telemetry ingestion and polygon geofence detection.
          </p>
        </div>

        {/* Console Container */}
        <div className="rounded-2xl border border-slate-800 bg-[#111726] p-5 sm:p-7 shadow-2xl space-y-6">
          
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md active:scale-95 ${
                  isRunning
                    ? 'bg-amber-400 hover:bg-yellow-300 text-slate-950 shadow-amber-500/20'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                }`}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isRunning ? 'Pause Stream' : 'Resume Stream'}</span>
              </button>

              <button
                onClick={resetSimulation}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-amber-500/20 rounded-xl transition-colors cursor-pointer"
                title="Reset simulation parameters"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Reset</span>
              </button>
            </div>

            {/* Frequency Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Stream Frequency:</span>
              <div className="flex items-center p-1 bg-slate-950 border border-amber-500/20 rounded-xl">
                {[10, 30, 60].map((hz) => (
                  <button
                    key={hz}
                    onClick={() => setFrequencyHz(hz)}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                      frequencyHz === hz
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {hz}Hz
                  </button>
                ))}
              </div>
            </div>

            {/* Incident Triggers */}
            <div className="flex items-center gap-2">
              <button
                onClick={triggerBreach}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  simulatedIncident === 'geofence_breach'
                    ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                    : 'bg-slate-900/90 border-amber-500/20 text-slate-300 hover:text-amber-300 hover:border-amber-400/50'
                }`}
              >
                Trigger Geofence Breach
              </button>
              <button
                onClick={triggerBraking}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  simulatedIncident === 'hard_braking'
                    ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                    : 'bg-slate-900/90 border-amber-500/20 text-slate-300 hover:text-amber-300 hover:border-amber-400/50'
                }`}
              >
                Simulate Hard Brake
              </button>
            </div>
          </div>

          {/* Core Telemetry Grid (Instruments + Live Radar) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Radar Map Area (lg:col-span-6) */}
            <div className="lg:col-span-6 rounded-xl border border-amber-500/15 bg-[#080a11] p-4 flex flex-col justify-between shadow-inner">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <div className={`w-2 h-2 rounded-full ${geofenceStatus === 'Secure' ? 'bg-amber-400 shadow-sm shadow-amber-400' : 'bg-rose-500 animate-ping'}`} />
                  <span>Polygon Geofence Radar</span>
                </div>
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                  geofenceStatus === 'Secure'
                    ? 'text-amber-300 bg-amber-400/10 border border-amber-400/30'
                    : 'text-rose-400 bg-rose-950/60 border border-rose-800/50 animate-pulse'
                }`}>
                  Status: {geofenceStatus}
                </span>
              </div>

              {/* 2D Canvas Radar Representation */}
              <div className="relative aspect-square w-full rounded-lg bg-[#05060a] border border-amber-500/15 overflow-hidden flex items-center justify-center">
                {/* Radar Grid Circles with warm amber styling */}
                <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-amber-500/20 pointer-events-none" />
                <div className="absolute w-[50%] h-[50%] rounded-full border border-amber-500/15 pointer-events-none" />
                <div className="absolute w-[20%] h-[20%] rounded-full border border-amber-500/10 pointer-events-none" />
                <div className="absolute w-full h-[1px] bg-amber-500/10 pointer-events-none" />
                <div className="absolute h-full w-[1px] bg-amber-500/10 pointer-events-none" />

                {/* Safe Geofence Polygon Corridor */}
                <div 
                  className={`absolute w-[70%] h-[70%] rounded-2xl border-2 transition-colors ${
                    geofenceStatus === 'Secure' ? 'border-amber-400/40 bg-amber-400/5' : 'border-rose-500/50 bg-rose-500/10'
                  }`}
                />

                {/* Simulated Vehicle Indicator */}
                <div 
                  className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full flex items-center justify-center transition-all duration-150"
                  style={{
                    left: `${vehiclePos.x}%`,
                    top: `${vehiclePos.y}%`
                  }}
                >
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    geofenceStatus === 'Secure' ? 'bg-amber-400' : 'bg-rose-400'
                  }`} />
                  <span className={`relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-white ${
                    geofenceStatus === 'Secure' ? 'bg-amber-400 shadow-md shadow-amber-400' : 'bg-rose-600'
                  }`} />
                </div>

                {/* Radar sweep beam animation in gold/amber */}
                <div 
                  className="absolute w-1/2 h-1/2 origin-bottom-right bottom-1/2 right-1/2 pointer-events-none"
                  style={{
                    background: 'conic-gradient(from 0deg at 100% 100%, rgba(245, 158, 11, 0.2) 0deg, transparent 60deg)',
                    transform: `rotate(${angle * (180 / Math.PI)}deg)`
                  }}
                />

                {/* Coordinate HUD readout */}
                <div className="absolute bottom-2 left-2 text-[10px] font-mono text-amber-500/60">
                  POS: {vehiclePos.x.toFixed(1)}°E, {vehiclePos.y.toFixed(1)}°N
                </div>
                <div className="absolute top-2 right-2 text-[10px] font-mono text-amber-500/60">
                  ZOOM: 1:5000 (PUNE URBAN)
                </div>
              </div>

              {/* Bottom radar footer note */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>Algorithm: Point-in-Polygon Ray Casting</span>
                <span className="font-mono text-amber-400">&lt; 0.2ms evaluation</span>
              </div>
            </div>

            {/* Right Telemetry Gauges (lg:col-span-6) */}
            <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
              
              {/* Gauges Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                
                {/* Speed Card */}
                <div className="p-3.5 rounded-xl border border-amber-500/15 bg-[#080a11]">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Vehicle Speed</span>
                    <Gauge className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums">
                    {currentSpeed} <span className="text-xs font-normal text-slate-400">km/h</span>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between">
                    <span>Limit: 80 km/h</span>
                    <span className={currentSpeed > 80 ? 'text-rose-400 font-bold' : 'text-amber-400'}>
                      {currentSpeed > 80 ? 'OVERSPEED' : 'NOMINAL'}
                    </span>
                  </div>
                </div>

                {/* Radar Distance Card */}
                <div className="p-3.5 rounded-xl border border-amber-500/15 bg-[#080a11]">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Radar Range</span>
                    <Radio className="w-3.5 h-3.5 text-yellow-400" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">
                    {radarDistance} <span className="text-xs font-normal text-slate-400">m</span>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between">
                    <span>Lead Target</span>
                    <span className={radarDistance < 15 ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                      {radarDistance < 15 ? 'PROXIMITY' : 'CLEAR'}
                    </span>
                  </div>
                </div>

                {/* Socket Ingestion Latency */}
                <div className="p-3.5 rounded-xl border border-amber-500/15 bg-[#080a11]">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Socket Latency</span>
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums">
                    {latencyMs} <span className="text-xs font-normal text-slate-400">ms</span>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-500">
                    60fps budget: &lt;16.6ms
                  </div>
                </div>

                {/* Engine RPM */}
                <div className="p-3.5 rounded-xl border border-amber-500/15 bg-[#080a11]">
                  <div className="text-xs text-slate-400 mb-1">CAN-bus RPM</div>
                  <div className="text-xl font-bold text-white font-mono tabular-nums">
                    {rpm.toLocaleString()}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-500">Torque: 280 Nm</div>
                </div>

                {/* Packets Ingested */}
                <div className="p-3.5 rounded-xl border border-amber-500/15 bg-[#080a11]">
                  <div className="text-xs text-slate-400 mb-1">Ingested Frames</div>
                  <div className="text-xl font-bold text-yellow-300 font-mono tabular-nums">
                    {packetsReceived.toLocaleString()}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-500">Zero packet drops</div>
                </div>

                {/* Battery Health */}
                <div className="p-3.5 rounded-xl border border-amber-500/15 bg-[#080a11]">
                  <div className="text-xs text-slate-400 mb-1">Battery / Bus</div>
                  <div className="text-xl font-bold text-white font-mono tabular-nums">
                    {batteryHealth}%
                  </div>
                  <div className="mt-1 text-[10px] text-amber-400">12.6V Regulated</div>
                </div>

              </div>

              {/* Real-Time Alert Event Log */}
              <div className="rounded-xl border border-amber-500/15 bg-[#080a11] p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-amber-400" />
                    <span>Real-Time Alert Dispatcher</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-500/70">Socket.io Channel #telemetry-alerts</span>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {recentAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-2 rounded text-xs flex items-start gap-2 border ${
                        alert.type === 'warning'
                          ? 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                          : alert.type === 'success'
                          ? 'bg-amber-400/10 border-amber-400/30 text-amber-200'
                          : 'bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-75 shrink-0 mt-0.5">
                        [{alert.time}]
                      </span>
                      <span className="leading-snug">{alert.message}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Insights Callout */}
              <div className="p-3.5 rounded-xl bg-amber-400/5 border border-amber-400/20 flex items-start gap-3">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-amber-300 font-semibold">How Sapna Solved This at Starkenn:</strong> Instead of dispatching every WebSocket packet directly into React state, incoming payloads are buffered in a ring queue and drained on every <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded font-mono">requestAnimationFrame</code>, preventing UI thread freezes on high-frequency 60Hz CAN-bus feeds.
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
