import React, { useState, useEffect } from 'react';
import { generateQuiz, allSituations } from './utils';
import { QuizQuestion, AnswerState, Situation } from './types';
import { AlertCircle, CheckCircle2, ChevronRight, ChevronLeft, ChevronDown, Play, RotateCcw, XCircle, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type GameState = 'home' | 'playing' | 'result' | 'learning';


export default function App() {
  const [gameState, setGameState] = useState<GameState>('home');
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState[]>([]);
  const [learningIndex, setLearningIndex] = useState(0);

  const startGame = (testId: number | 'random' = 'random') => {
    setQuizData(generateQuiz(10, testId));
    setCurrentIndex(0);
    setAnswers(Array(10).fill({ name: null, indirect: null, direct: null, action: null }));
    setGameState('playing');
  };

  const handleAnswer = (field: keyof AnswerState, value: string) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentIndex] = {
        ...newAnswers[currentIndex],
        [field]: value
      };
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setGameState('result');
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    quizData.forEach((question, index) => {
      const ans = answers[index];
      if (ans.name === question.situationName) totalScore += 0.25;
      if (ans.indirect === question.indirectOptions.find(o => o.isCorrect)?.text) totalScore += 0.25;
      if (ans.direct === question.directOptions.find(o => o.isCorrect)?.text) totalScore += 0.25;
      if (ans.action === question.actionOptions.find(o => o.isCorrect)?.text) totalScore += 0.25;
    });
    return totalScore;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <AlertCircle size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Mô Phỏng Giao Thông</h1>
          </div>
          {gameState === 'playing' && (
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">Tiến độ</p>
                <p className="text-lg font-mono font-bold text-blue-600">{currentIndex + 1} / {quizData.length}</p>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {gameState === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Ôn thi mô phỏng 120 tình huống
              </h2>
              <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Chọn một đề thi bên dưới để bắt đầu. Mỗi đề gồm 10 tình huống, yêu cầu bạn xác định 4 yếu tố: Nhận biết nguy cơ, Dấu hiệu gián tiếp, Dấu hiệu trực tiếp và Phương án xử lý.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-3xl mx-auto mb-10">
                {Array.from({ length: 10 }, (_, i) => i + 1).map(testId => (
                  <button
                    key={testId}
                    onClick={() => startGame(testId)}
                    className="bg-white border-2 border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-slate-700 hover:text-blue-700 py-4 rounded-xl font-bold transition-all shadow-sm active:scale-95"
                  >
                    Đề {testId}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                  onClick={() => startGame('random')}
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors shadow-md active:scale-95 uppercase tracking-wider"
                >
                  <Play size={18} />
                  Đề ngẫu nhiên
                </button>
                <button
                  onClick={() => setGameState('learning')}
                  className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 px-8 py-3 rounded-full text-sm font-semibold transition-colors shadow-sm active:scale-95 uppercase tracking-wider"
                >
                  <BookOpen size={18} />
                  Học từng tình huống
                </button>
              </div>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 pb-20"
            >
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Tình huống {quizData[currentIndex].id}</h3>
                    <p className="text-sm text-slate-600 font-medium">Hãy chọn đáp án đúng nhất cho từng yếu tố cấu thành tình huống này.</p>
                  </div>
                  <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded border border-emerald-100 uppercase tracking-widest">
                    Mô phỏng
                  </div>
                </div>
                
                {/* Video Player */}
                <div className="w-full aspect-video bg-slate-900 rounded-lg overflow-hidden relative mb-6 border border-slate-800 shadow-inner flex items-center justify-center group">
                  <video 
                    className="w-full h-full object-cover opacity-80"
                    controls
                    poster={`https://placehold.co/800x450/1e293b/ffffff?text=Video+Tình+Huống+${quizData[currentIndex].id}`}
                    src={`https://daotaolaixehd.com.vn/videos_v2/${quizData[currentIndex].id}.mp4#t=9`}
                  >
                    Trình duyệt của bạn không hỗ trợ thẻ video.
                  </video>
                  {/* Top overlay to hide the burnt-in watermark */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-slate-900/40 backdrop-blur-md pointer-events-none z-10 flex items-start">
                    <div className="mt-4 ml-4 bg-black/60 text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest border border-white/10">
                      Camera Hành Trình
                    </div>
                  </div>
                </div>
              </div>

              <QuestionBlock
                title="1. Nhận biết tình huống (Nguy cơ chính)"
                options={quizData[currentIndex].nameOptions}
                selectedValue={answers[currentIndex].name}
                onSelect={(val) => handleAnswer('name', val)}
              />
              <QuestionBlock
                title="2. Dấu hiệu nhận biết gián tiếp"
                options={quizData[currentIndex].indirectOptions}
                selectedValue={answers[currentIndex].indirect}
                onSelect={(val) => handleAnswer('indirect', val)}
              />
              <QuestionBlock
                title="3. Dấu hiệu nhận biết trực tiếp"
                options={quizData[currentIndex].directOptions}
                selectedValue={answers[currentIndex].direct}
                onSelect={(val) => handleAnswer('direct', val)}
              />
              <QuestionBlock
                title="4. Phương án xử lý an toàn"
                options={quizData[currentIndex].actionOptions}
                selectedValue={answers[currentIndex].action}
                onSelect={(val) => handleAnswer('action', val)}
              />

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleNext}
                  disabled={!answers[currentIndex].name || !answers[currentIndex].indirect || !answers[currentIndex].direct || !answers[currentIndex].action}
                  className="inline-flex items-center gap-2 bg-slate-900 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed hover:bg-slate-800 text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors"
                >
                  {currentIndex === quizData.length - 1 ? 'Nộp bài' : 'Câu tiếp theo'}
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {gameState === 'learning' && (
            <motion.div
              key="learning"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8 pb-20"
            >
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setGameState('home')}
                  className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0"
                >
                  Màn hình chính
                </button>
                <div className="flex-1 max-w-sm w-full relative">
                  <select
                    className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pl-4 pr-10 font-semibold cursor-pointer outline-none"
                    value={learningIndex}
                    onChange={(e) => setLearningIndex(Number(e.target.value))}
                  >
                    {allSituations.map((sit, idx) => (
                      <option key={sit.id} value={idx}>
                        Tình huống {sit.id}: {sit.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                    <ChevronDown size={16} />
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setLearningIndex(Math.max(0, learningIndex - 1))}
                    disabled={learningIndex === 0}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setLearningIndex(Math.min(allSituations.length - 1, learningIndex + 1))}
                    disabled={learningIndex === allSituations.length - 1}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Tình huống {allSituations[learningIndex].id}</h3>
                    <p className="text-sm text-slate-600 font-medium">Học và ghi nhớ các dấu hiệu.</p>
                  </div>
                  <div className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded border border-blue-100 uppercase tracking-widest">
                    Chế độ học
                  </div>
                </div>
                
                <div className="w-full aspect-video bg-slate-900 rounded-lg overflow-hidden relative mb-6 border border-slate-800 shadow-inner flex items-center justify-center group">
                  <video 
                    key={`learn-vid-${allSituations[learningIndex].id}`}
                    className="w-full h-full object-cover opacity-80"
                    controls
                    poster={`https://placehold.co/800x450/1e293b/ffffff?text=Video+Tình+Huống+${allSituations[learningIndex].id}`}
                    src={`https://daotaolaixehd.com.vn/videos_v2/${allSituations[learningIndex].id}.mp4#t=9`}
                  >
                    Trình duyệt của bạn không hỗ trợ thẻ video.
                  </video>
                  {/* Top overlay to hide the burnt-in watermark */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-slate-900/40 backdrop-blur-md pointer-events-none z-10 flex items-start">
                    <div className="mt-4 ml-4 bg-black/60 text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest border border-white/10">
                      Camera Hành Trình
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <ResultItem label="1. Nhận biết tình huống" userAns={null} correctAns={allSituations[learningIndex].name} isCorrect={true} />
                <ResultItem label="2. Dấu hiệu gián tiếp" userAns={null} correctAns={allSituations[learningIndex].indirect} isCorrect={true} />
                <ResultItem label="3. Dấu hiệu trực tiếp" userAns={null} correctAns={allSituations[learningIndex].direct} isCorrect={true} />
                <ResultItem label="4. Phương án xử lý" userAns={null} correctAns={allSituations[learningIndex].action} isCorrect={true} />
              </div>
            </motion.div>
          )}

          {gameState === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 text-center">
                <h2 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-4">Kết quả bài thi</h2>
                
                {(() => {
                  const score = calculateScore();
                  const isPassed = score >= 7;
                  return (
                    <div className="mb-6">
                      <div className="text-6xl font-black text-slate-900 mb-3 tracking-tighter">
                        {score} <span className="text-3xl text-slate-300 font-bold">/ 10</span>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest border ${isPassed ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'}`}>
                        {isPassed ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                        {isPassed ? 'Đạt' : 'Chưa đạt'}
                      </div>
                    </div>
                  );
                })()}

                <p className="text-slate-500 mb-8 text-sm">Điểm số tối đa là 10 (mỗi tình huống 1 điểm). Yêu cầu đạt: 7/10 điểm.</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setGameState('home')}
                    className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 px-8 py-3 rounded-full text-sm font-semibold transition-colors shadow-sm active:scale-95 uppercase tracking-wider"
                  >
                    Màn hình chính
                  </button>
                  <button
                    onClick={() => startGame('random')}
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors shadow-md active:scale-95 uppercase tracking-wider"
                  >
                    <RotateCcw size={18} />
                    Thi lại (Ngẫu nhiên)
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest px-2">Chi tiết đánh giá</h3>
                {quizData.map((q, idx) => {
                  const ans = answers[idx];
                  const cName = ans.name === q.situationName;
                  const cIndirect = ans.indirect === q.indirectOptions.find(o => o.isCorrect)?.text;
                  const cDirect = ans.direct === q.directOptions.find(o => o.isCorrect)?.text;
                  const cAction = ans.action === q.actionOptions.find(o => o.isCorrect)?.text;
                  const score = (cName ? 0.25 : 0) + (cIndirect ? 0.25 : 0) + (cDirect ? 0.25 : 0) + (cAction ? 0.25 : 0);

                  return (
                    <div key={idx} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                        <h4 className="font-bold text-sm text-slate-800">Tình huống {q.id}</h4>
                        <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded border border-emerald-100">
                          {score} điểm
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
                        <div className="p-6 md:w-1/3 bg-slate-50/50 flex flex-col justify-center items-center">
                           <div className="w-full aspect-video bg-slate-900 rounded-lg overflow-hidden relative shadow-sm border border-slate-800">
                             <video 
                               className="w-full h-full object-cover opacity-80"
                               controls
                               poster={`https://placehold.co/400x225/1e293b/ffffff?text=Video+Tình+Huống+${q.id}`}
                               src={`https://daotaolaixehd.com.vn/videos_v2/${q.id}.mp4#t=9`}
                             />
                           </div>
                           <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-3">Xem lại tình huống</span>
                        </div>
                        <div className="p-6 space-y-6 md:w-2/3">
                          <ResultItem label="Nhận biết tình huống" userAns={ans.name} correctAns={q.situationName} isCorrect={cName} />
                          <ResultItem label="Dấu hiệu gián tiếp" userAns={ans.indirect} correctAns={q.indirectOptions.find(o => o.isCorrect)?.text || ''} isCorrect={cIndirect} />
                          <ResultItem label="Dấu hiệu trực tiếp" userAns={ans.direct} correctAns={q.directOptions.find(o => o.isCorrect)?.text || ''} isCorrect={cDirect} />
                          <ResultItem label="Phương án xử lý" userAns={ans.action} correctAns={q.actionOptions.find(o => o.isCorrect)?.text || ''} isCorrect={cAction} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function QuestionBlock({ title, options, selectedValue, onSelect }: { title: string, options: {text: string, isCorrect: boolean}[], selectedValue: string | null, onSelect: (val: string) => void }) {
  const hasSelected = selectedValue !== null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-4">{title}</h4>
      <div className="space-y-3">
        {options.map((opt, i) => {
          const isSelected = selectedValue === opt.text;
          
          let containerClasses = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50';
          let circleClasses = 'border-slate-300';
          let textClasses = 'text-slate-700';
          let innerCircle = null;

          if (hasSelected) {
            if (opt.isCorrect) {
              containerClasses = isSelected ? 'border-emerald-500 bg-emerald-50' : 'border-emerald-500 bg-emerald-50/50';
              circleClasses = 'border-emerald-500';
              textClasses = 'text-emerald-900 font-medium';
              innerCircle = <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />;
            } else if (isSelected) {
              containerClasses = 'border-rose-500 bg-rose-50';
              circleClasses = 'border-rose-500';
              textClasses = 'text-rose-900 font-medium';
              innerCircle = <div className="w-2.5 h-2.5 bg-rose-500 rounded-full" />;
            } else {
              containerClasses = 'border-slate-100 opacity-60';
              circleClasses = 'border-slate-200';
              textClasses = 'text-slate-400';
            }
          } else if (isSelected) {
            containerClasses = 'border-blue-600 bg-blue-50';
            circleClasses = 'border-blue-600';
            textClasses = 'text-blue-900 font-medium';
            innerCircle = <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />;
          }

          return (
            <label
              key={i}
              className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                hasSelected ? 'cursor-default' : 'cursor-pointer'
              } ${containerClasses}`}
            >
              <input 
                type="radio" 
                className="sr-only" 
                name={title}
                value={opt.text}
                checked={isSelected}
                onChange={() => {
                  if (!hasSelected) {
                    onSelect(opt.text);
                  }
                }}
                disabled={hasSelected}
              />
              <div className="pt-0.5">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${circleClasses}`}>
                  {innerCircle}
                </div>
              </div>
              <span className={`text-base leading-relaxed flex-1 ${textClasses}`}>
                {opt.text}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function ResultItem({ label, userAns, correctAns, isCorrect }: { label: string, userAns: string | null, correctAns: string, isCorrect: boolean }) {
  return (
    <div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</div>
      <div className="flex items-start gap-3">
        <div className="pt-1">
          {isCorrect ? <CheckCircle2 className="text-emerald-500" size={20} /> : <XCircle className="text-rose-500" size={20} />}
        </div>
        <div className="flex-1 space-y-1">
          {!isCorrect && (
            <div className="text-rose-600 line-through opacity-80">{userAns || '(Không chọn)'}</div>
          )}
          <div className="text-emerald-700 font-medium">{correctAns}</div>
        </div>
      </div>
    </div>
  );
}
