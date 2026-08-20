import React, { useState } from 'react';
import { X, Send, Bot, Sparkles, Loader2 } from 'lucide-react';
import { chatAdvisorApi } from '../services/api';

interface ChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  unidaysActive: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  topic?: string;
  timestamp: string;
}

export const ChatbotDrawer: React.FC<ChatbotDrawerProps> = ({
  isOpen,
  onClose,
  unidaysActive
}) => {
  if (!isOpen) return null;

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      topic: 'RECO Hardware & Discount Advisor',
      text: '👋 Hi! I am your RECO Hardware & Discount Advisor. Ask me anything about GPU TGP Wattage, Thermal Cooling, UNiDAYS Student Discounts, or compare specific laptop specs!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const quickPrompts = [
    'What is GPU TGP Wattage?',
    'How do I claim UNiDAYS student discount?',
    'OLED vs IPS vs Mini-LED screens?',
    'Best laptop for AAA Gaming under ₹1.5 Lakhs?'
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const res = await chatAdvisorApi(textToSend, unidaysActive);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        topic: res.topic,
        text: res.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: '⚡ GPU TGP (Total Graphics Power) determines the electric wattage limit of your graphics card. Higher TGP (e.g. 140W RTX 4070 vs 45W) delivers significantly higher gaming FPS.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] glass-panel border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between backdrop-blur-2xl animate-slideLeft">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#12141A]">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-[#415FFF] text-white">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>RECO AI Hardware Advisor</span>
              <Sparkles className="w-3.5 h-3.5 text-[#415FFF] dark:text-cyan-400" />
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Connected to /api/chatbot & FastAPI Engine</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] p-3.5 rounded-3xl space-y-1.5 ${
                msg.sender === 'user'
                  ? 'bg-[#415FFF] text-white rounded-br-none shadow-glow-iris'
                  : 'bg-white dark:bg-[#12141A] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-sm'
              }`}
            >
              {msg.topic && (
                <span className="text-[10px] font-mono font-bold text-[#415FFF] dark:text-cyan-400 block uppercase tracking-wider">
                  {msg.topic}
                </span>
              )}
              <div className="whitespace-pre-wrap leading-relaxed">
                {msg.text}
              </div>
              <span className="text-[9px] text-slate-400 block text-right font-mono">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-white dark:bg-[#12141A] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-mono max-w-[80%] animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin text-[#415FFF]" />
            <span>Analyzing TGP limits and UNiDAYS student perks...</span>
          </div>
        )}
      </div>

      {/* Prompt Chips & Input Bar */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0B0E] space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-[10px] px-3 py-1.5 rounded-full bg-slate-100 dark:bg-[#12141A] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#415FFF] transition-all text-left active:scale-95"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about TGP, Thermals, UNiDAYS discounts..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-slate-100 dark:bg-[#12141A] border border-slate-200 dark:border-slate-800 rounded-full px-4 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#415FFF] font-sans"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-full bg-[#415FFF] text-white hover:bg-blue-600 disabled:opacity-50 transition-all active:scale-95 shadow-glow-iris"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
