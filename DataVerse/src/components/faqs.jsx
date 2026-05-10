import React, { useState, useRef } from 'react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  const contentRef = useRef(null);

  return (
    <div className="faq-item py-4 px-12 border-b-2">
      <div className="faq-question flex justify-between items-center cursor-pointer" onClick={onClick}>
        <h3 className="text-2xl font-medium font-sans">{question}</h3>
        <div className={`h-10 w-10 border text-2xl flex justify-center rounded-full ${isOpen ? 'bg-theme border-none' : 'bg-white'} hover:bg-themeblack border-black`}>
          <button className={`text-center font-bold h-5 ${isOpen ? 'text-white' : 'text-theme'}`}>{isOpen ? '-' : '+'}</button>
        </div>
      </div>
      <div
        ref={contentRef}
        className={`faq-answer overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ maxHeight: isOpen ? `${contentRef.current.scrollHeight}px` : '0' }}
      >
        <p className="text-lg font-sans mt-2">{answer}</p>
      </div> 
    </div>
    
  );
};

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "01. Can I Find the right information faster?",
      answer: "Nulla lectus lectus, suscipit at posuere sit amet, imperdiet sit amet sapien. Donec ornajusto, efficitur enim fermen. Nam enim ligula, lacinia vitae venenatis quis, suscipit id augue.",
    },
    {
      question: "02. How to share feature demos and ideas?",
      answer: "Answer to the second question.",
    },
    {
      question: "03. How to get response from industries?",
      answer: "Answer to the third question.",
    },
    {
      question: "04. Can I use code editor separately from a course?",
      answer: "Answer to the fourth question.",
    },
  ];

  const toggleFAQ = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-bold font-sans text-center my-8">FAQs</h2>
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => toggleFAQ(index)}
        />
      ))}
    </div>
  );
};

export default Faqs;
