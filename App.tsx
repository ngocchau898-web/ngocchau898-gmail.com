
import React, { useState } from 'react';
import { MushroomData, StudentInfo, Answers } from './types';

const MUSHROOMS: MushroomData[] = [
  { id: 'tai-meo', name: 'Nấm tai mèo', thumb: 'https://drive.google.com/thumbnail?id=1xrNCyWa8SQOgr5w19xE7w6TcyIhGC4-b', shape: '', color: '', size: '' },
  { id: 'rom', name: 'Nấm rơm', thumb: 'https://drive.google.com/thumbnail?id=19rmk6G_FvW68oZvYOD3GJwUpB7tXsCBP', shape: '', color: '', size: '' },
  { id: 'kim-cham', name: 'Nấm kim châm', thumb: 'https://drive.google.com/thumbnail?id=19HggWBvJEbivg-WgDWWMwCUDGeDryxkO', shape: '', color: '', size: '' },
  { id: 'linh-chi', name: 'Nấm linh chi', thumb: 'https://drive.google.com/thumbnail?id=10x6gdUX5fdLS6cqhTwBDLnVBNtFBR6fo', shape: '', color: '', size: '' },
  { id: 'moc', name: 'Nấm mốc', thumb: 'https://drive.google.com/thumbnail?id=1kTF9GuDCh5s5rkSWM2resWgHrmdFRVBE', shape: '', color: '', size: '' },
  { id: 'men', name: 'Nấm men', thumb: 'https://drive.google.com/thumbnail?id=1xL6BIRtjTTaWV04I7vbF0wzPwVGLkuSu', shape: '', color: '', size: '' },
];

const App: React.FC = () => {
  const [info, setInfo] = useState<StudentInfo>({ name: '', class: '' });
  const [answers, setAnswers] = useState<Answers>({
    q1: MUSHROOMS.reduce((acc, m) => ({ ...acc, [m.id]: { shape: '', color: '', size: '' } }), {}),
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: { mu: '', than: '', chan: '' },
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleQ1Change = (id: string, field: 'shape' | 'color' | 'size', value: string) => {
    setAnswers(prev => ({
      ...prev,
      q1: {
        ...prev.q1,
        [id]: { ...prev.q1[id], [field]: value }
      }
    }));
  };

  const handleGenericChange = (field: keyof Answers, value: any) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const handleQ7Change = (field: 'mu' | 'than' | 'chan', value: string) => {
    setAnswers(prev => ({
      ...prev,
      q7: { ...prev.q7, [field]: value }
    }));
  };

  const calculateScore = () => {
    let score = 0;
    if (answers.q5 === 'D') score += 1;
    if (answers.q7.mu.toLowerCase().includes('mũ')) score += 1;
    if (answers.q7.than.toLowerCase().includes('thân')) score += 1;
    if (answers.q7.chan.toLowerCase().includes('chân')) score += 1;
    return score;
  };

  const handleSubmit = () => {
    if (!info.name.trim()) {
      alert('Vui lòng nhập họ và tên của em nhé! 🍄');
      return;
    }

    const score = calculateScore();
    const subject = encodeURIComponent(`BÀI TẬP NẤM: ${info.class} - ${info.name}`);
    const body = encodeURIComponent(
      `Họ tên: ${info.name}\n` +
      `Lớp: ${info.class}\n` +
      `Điểm trắc nghiệm & cấu tạo: ${score}/4\n\n` +
      `Câu 2: ${answers.q2}\n` +
      `Câu 3: ${answers.q3}\n` +
      `Câu 4: ${answers.q4}\n` +
      `Câu 6: ${answers.q6}`
    );
    
    window.location.href = `mailto:ngocchau898@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl border-4 border-green-500 max-w-md w-full text-center space-y-6 animate-bounce-short">
          <div className="text-6xl">🎉</div>
          <h1 className="text-3xl font-bold text-green-700">Nộp Bài Thành Công!</h1>
          <p className="text-lg text-gray-600">
            Điểm trắc nghiệm và cấu tạo nấm của {info.name}: 
            <span className="block text-4xl font-black text-orange-500 mt-2">{calculateScore()}/4</span>
          </p>
          <p className="text-sm text-gray-500 italic">
            Đừng quên nhấn "Gửi" trong ứng dụng email để thầy cô nhận được kết quả nhé!
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors"
          >
            Làm lại bài
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 pb-24">
      <header className="text-center space-y-4">
        <h1 className="text-2xl md:text-4xl font-black text-green-800 tracking-tight uppercase">
          🍄 Phiếu Bài Tập: Khám Phá Thế Giới Nấm 🍄
        </h1>
        <div className="bg-green-100 p-4 rounded-2xl flex flex-col md:flex-row gap-4 border-2 border-green-200">
          <div className="flex-1 flex items-center gap-2">
            <label className="font-bold text-green-700 whitespace-nowrap">Họ tên:</label>
            <input 
              name="name"
              value={info.name}
              onChange={handleInfoChange}
              placeholder="Nhập tên của em..."
              className="w-full px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex-1 flex items-center gap-2">
            <label className="font-bold text-green-700 whitespace-nowrap">Lớp:</label>
            <input 
              name="class"
              value={info.class}
              onChange={handleInfoChange}
              placeholder="Ví dụ: 3A1"
              className="w-full px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </header>

      <main className="space-y-6">
        {/* Câu 1 */}
        <section className="bg-white p-6 rounded-3xl border-2 border-gray-100 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-green-800 flex items-center gap-2">
            <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</span>
            Xem clip và điền đặc điểm các loại nấm vào bảng:
          </h2>
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
            <iframe 
              src="https://drive.google.com/file/d/10CrlSZDtjIDGV_qjdZYHzMQupUf33NZv/preview"
              className="w-full h-full border-0"
              allow="autoplay"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-green-500 text-white">
                  <th className="p-3 border border-green-600 rounded-tl-xl">Loại nấm</th>
                  <th className="p-3 border border-green-600">Hình dáng</th>
                  <th className="p-3 border border-green-600">Màu sắc</th>
                  <th className="p-3 border border-green-600 rounded-tr-xl">Kích thước</th>
                </tr>
              </thead>
              <tbody>
                {MUSHROOMS.map(m => (
                  <tr key={m.id} className="hover:bg-green-50 transition-colors">
                    <td className="p-3 border border-gray-200 text-center">
                      <img src={m.thumb} alt={m.name} className="w-16 h-16 object-contain mx-auto mb-1 rounded" />
                      <span className="text-xs font-bold text-gray-600">{m.name}</span>
                    </td>
                    <td className="p-2 border border-gray-200">
                      <input 
                        type="text" 
                        value={answers.q1[m.id].shape}
                        onChange={(e) => handleQ1Change(m.id, 'shape', e.target.value)}
                        className="w-full p-2 bg-transparent focus:bg-white focus:outline-none text-center"
                      />
                    </td>
                    <td className="p-2 border border-gray-200">
                      <input 
                        type="text" 
                        value={answers.q1[m.id].color}
                        onChange={(e) => handleQ1Change(m.id, 'color', e.target.value)}
                        className="w-full p-2 bg-transparent focus:bg-white focus:outline-none text-center"
                      />
                    </td>
                    <td className="p-2 border border-gray-200">
                      <input 
                        type="text" 
                        value={answers.q1[m.id].size}
                        onChange={(e) => handleQ1Change(m.id, 'size', e.target.value)}
                        className="w-full p-2 bg-transparent focus:bg-white focus:outline-none text-center"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Câu 2-4: Textareas */}
        {[
          { id: 'q2', label: 'Câu 2: Nhận xét chung của em về hình dáng, màu sắc, kích thước của các loại nấm:', placeholder: 'Em hãy viết nhận xét vào đây...' },
          { id: 'q3', label: 'Câu 3: Kể tên một số loại nấm khác mà em biết:', placeholder: 'Ví dụ: Nấm hương, nấm đùi gà...' },
          { id: 'q4', label: 'Câu 4: Nấm thường mọc ở đâu?', placeholder: 'Nơi em thường quan sát thấy nấm mọc...' },
        ].map((q, idx) => (
          <section key={q.id} className="bg-white p-6 rounded-3xl border-2 border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-green-800 flex items-center gap-2">
              <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">{idx + 2}</span>
              {q.label}
            </h2>
            <textarea 
              rows={3}
              value={(answers as any)[q.id]}
              onChange={(e) => handleGenericChange(q.id as any, e.target.value)}
              placeholder={q.placeholder}
              className="w-full p-4 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
            />
          </section>
        ))}

        {/* Câu 5: Multiple Choice */}
        <section className="bg-white p-6 rounded-3xl border-2 border-gray-100 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-green-800 flex items-center gap-2">
            <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">5</span>
            Nấm thường sống ở đâu?
          </h2>
          <div className="grid gap-3">
            {[
              { val: 'A', text: 'Khô ráo' },
              { val: 'B', text: 'Ẩm ướt' },
              { val: 'C', text: 'Nhiều nắng' },
              { val: 'D', text: 'Nhiều chất dinh dưỡng (đất ẩm, rơm rạ, xác thực vật)' },
            ].map(opt => (
              <label 
                key={opt.val}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${answers.q5 === opt.val ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-transparent hover:border-gray-200'}`}
              >
                <input 
                  type="radio" 
                  name="q5" 
                  checked={answers.q5 === opt.val}
                  onChange={() => handleGenericChange('q5', opt.val)}
                  className="w-5 h-5 text-green-600 focus:ring-green-500"
                />
                <span className="font-medium text-gray-700"><span className="font-bold">{opt.val}.</span> {opt.text}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Câu 6 */}
        <section className="bg-white p-6 rounded-3xl border-2 border-gray-100 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-green-800 flex items-center gap-2">
            <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">6</span>
            Nấm có màu sắc rực rỡ thường là loại nấm gì?
          </h2>
          <input 
            type="text"
            value={answers.q6}
            onChange={(e) => handleGenericChange('q6', e.target.value)}
            placeholder="Trả lời câu hỏi của em..."
            className="w-full p-4 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
          />
        </section>

        {/* Câu 7: Anatomy */}
        <section className="bg-white p-6 rounded-3xl border-2 border-gray-100 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-green-800 flex items-center gap-2">
            <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">7</span>
            Quan sát hình và điền tên bộ phận (Mũ nấm, Thân nấm, Chân nấm):
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 py-8">
            <div className="relative w-64 md:w-80 h-auto">
              <img 
                src="https://drive.google.com/thumbnail?id=1fUtC9oDBBpG48g-XDQdxbbisY1lZoMIK" 
                alt="Cấu tạo nấm" 
                className="w-full rounded-2xl border-4 border-orange-200 shadow-lg"
              />
              {/* Visual Arrows (Simplified overlays) */}
              <div className="absolute top-[20%] -right-12 w-16 h-[2px] bg-red-500 after:content-[''] after:absolute after:right-0 after:-top-[4px] after:border-y-[5px] after:border-y-transparent after:border-l-[10px] after:border-l-red-500" />
              <div className="absolute top-[50%] -right-12 w-16 h-[2px] bg-red-500 after:content-[''] after:absolute after:right-0 after:-top-[4px] after:border-y-[5px] after:border-y-transparent after:border-l-[10px] after:border-l-red-500" />
              <div className="absolute top-[80%] -right-12 w-16 h-[2px] bg-red-500 after:content-[''] after:absolute after:right-0 after:-top-[4px] after:border-y-[5px] after:border-y-transparent after:border-l-[10px] after:border-l-red-500" />
            </div>

            <div className="flex flex-col gap-10 md:gap-20">
              <div className="space-y-1">
                <p className="text-xs font-bold text-red-500 uppercase">Bộ phận 1</p>
                <input 
                  type="text"
                  value={answers.q7.mu}
                  onChange={(e) => handleQ7Change('mu', e.target.value)}
                  placeholder="..."
                  className="w-40 p-3 text-center border-2 border-green-200 rounded-xl focus:border-green-500 outline-none bg-green-50 font-bold"
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-red-500 uppercase">Bộ phận 2</p>
                <input 
                  type="text"
                  value={answers.q7.than}
                  onChange={(e) => handleQ7Change('than', e.target.value)}
                  placeholder="..."
                  className="w-40 p-3 text-center border-2 border-green-200 rounded-xl focus:border-green-500 outline-none bg-green-50 font-bold"
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-red-500 uppercase">Bộ phận 3</p>
                <input 
                  type="text"
                  value={answers.q7.chan}
                  onChange={(e) => handleQ7Change('chan', e.target.value)}
                  placeholder="..."
                  className="w-40 p-3 text-center border-2 border-green-200 rounded-xl focus:border-green-500 outline-none bg-green-50 font-bold"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-md shadow-[0_-5px_20px_rgba(0,0,0,0.05)] flex justify-center z-50">
        <button 
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xl py-4 px-12 rounded-full shadow-lg transform active:scale-95 transition-all hover:scale-105"
        >
          NỘP BÀI TẬP 🍄
        </button>
      </footer>
    </div>
  );
};

export default App;
