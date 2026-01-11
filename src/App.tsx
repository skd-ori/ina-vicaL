import { useCalculator } from './hooks/useCalculator';
import { ModeSelector } from './components/calculator/ModeSelector';
import { ResultDisplay } from './components/calculator/ResultDisplay';
import { CalculatorForm } from './components/calculator/CalculatorForm';

function App() {
  const { mode, setMode, params, updateParam, totalPower, resetParams } = useCalculator();

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center py-8 px-4 font-sans">
      <div className="w-full max-w-md">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            VICTORY CALC <span className="text-blue-500">v1.0</span>
          </h1>
          <p className="text-slate-500 text-sm">Inazuma Eleven Victory Road Tool</p>
        </header>

        {/* Mode Selector */}
        <ModeSelector currentMode={mode} onModeChange={setMode} />

        {/* Main Result */}
        <ResultDisplay total={totalPower} />

        {/* Form */}
        <CalculatorForm 
          mode={mode} 
          params={params} 
          onUpdate={updateParam}
          onReset={resetParams}
        />

        <footer className="mt-8 text-center text-slate-400 text-xs">
          Built with React + Tailwind
        </footer>
      </div>
    </div>
  );
}

export default App;
