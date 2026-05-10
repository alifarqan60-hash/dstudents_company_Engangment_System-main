'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, TrendingUp, Sparkles, AlertCircle, Bot, HardHat, FileText, Lock, Database, 
  Video, Settings, Rocket, Building2, Palette, PenTool, Layout, Terminal, Shield, 
  Key, CreditCard, Search, Globe, Mail, Package, Layers, Eye, BarChart3, RefreshCw, 
  GitBranch, TestTube, Share2, MessageSquare, Activity, Box, Cpu, Server, Cloud,
  Heart
} from 'lucide-react';

const techStack = [
  { name: 'WebSockets', icon: Zap, label: 'real-time ⚡', color: 'text-yellow-400' },
  { name: 'Kafka', icon: TrendingUp, label: 'scale 📈', color: 'text-blue-400' },
  { name: 'REST', icon: Sparkles, label: 'simplicity ✨', color: 'text-green-400' },
  { name: 'GraphQL', icon: AlertCircle, label: 'chaos 🤯', color: 'text-pink-400' },
  { name: 'Python', icon: Bot, label: 'AI 🤖', color: 'text-yellow-500' },
  { name: 'Go', icon: HardHat, label: 'infra 🏗️', color: 'text-cyan-400' },
  { name: 'ElasticSearch', icon: FileText, label: 'logs 📜', color: 'text-orange-400' },
  { name: 'Redis', icon: Zap, label: 'low-latency ⚡', color: 'text-red-400' },
  { name: 'Postgres', icon: Lock, label: 'high-availability 🔒', color: 'text-blue-500' },
  { name: 'Flink', icon: Video, label: 'streaming 🎥', color: 'text-purple-400' },
  { name: 'C', icon: Settings, label: 'low-level ⚙️', color: 'text-gray-400' },
  { name: 'C++', icon: Rocket, label: 'high-performance 🚀', color: 'text-indigo-400' },
  { name: 'Java', icon: Building2, label: 'enterprise 🏢', color: 'text-red-600' },
  { name: 'React', icon: Palette, label: 'frontend 🎨', color: 'text-cyan-300' },
  { name: 'Tailwind', icon: PenTool, label: 'styling 💅', color: 'text-teal-400' },
  { name: 'Next.js', icon: Layout, label: 'fullstack 🛠️', color: 'text-white' },
  { name: 'Node.js', icon: Terminal, label: 'backend 🔧', color: 'text-green-500' },
  { name: 'TypeScript', icon: Shield, label: 'type safety 🛡️', color: 'text-blue-600' },
  { name: 'OAuth', icon: Key, label: 'auth 🔑', color: 'text-orange-500' },
  { name: 'Stripe', icon: CreditCard, label: 'payments 💳', color: 'text-purple-500' },
  { name: 'Meilisearch', icon: Search, label: 'search 🔍', color: 'text-pink-500' },
  { name: 'CDN', icon: Globe, label: 'caching ⚡', color: 'text-blue-300' },
  { name: 'RabbitMQ', icon: Mail, label: 'queues 📬', color: 'text-orange-600' },
  { name: 'Docker', icon: Package, label: 'containers 📦', color: 'text-blue-400' },
  { name: 'Kubernetes', icon: Layers, label: 'orchestration 🎛️', color: 'text-blue-600' },
  { name: 'Prometheus', icon: Eye, label: 'monitoring 👀', color: 'text-red-500' },
  { name: 'Grafana', icon: BarChart3, label: 'dashboards 📊', color: 'text-orange-400' },
  { name: 'GitHub Actions', icon: RefreshCw, label: 'CI/CD 🔄', color: 'text-blue-500' },
  { name: 'Git', icon: GitBranch, label: 'version control 🧑‍💻', color: 'text-orange-500' },
  { name: 'Jest', icon: TestTube, label: 'testing 🧪', color: 'text-red-400' },
  { name: 'Postman', icon: Share2, label: 'API testing 🔌', color: 'text-orange-400' },
  { name: 'Vault', icon: Lock, label: 'secrets 🔐', color: 'text-yellow-600' },
  { name: 'gRPC', icon: MessageSquare, label: 'messaging 💬', color: 'text-teal-500' },
  { name: 'Pub/Sub', icon: Activity, label: 'event-driven ⚡', color: 'text-yellow-400' },
  { name: 'BigQuery', icon: Database, label: 'data warehouse 🗄️', color: 'text-blue-400' },
  { name: 'Pinecone', icon: Cpu, label: 'vector DB 🧠', color: 'text-blue-500' },
  { name: 'AWS Lambda', icon: Cloud, label: 'serverless ☁️', color: 'text-orange-400' },
];

export default function DanialApp() {
  return (
    <main className="min-h-screen p-4 md:p-12 lg:p-24 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-pink-500/20 rounded-full blur-[128px] animate-pulse-slow" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse-slow" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-4 text-gradient tracking-tighter">
            DANIAL <span className="accent-gradient italic">STACK</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
            The ultimate technology ecosystem for high-performance, real-time, and scalable applications.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              className="glass glass-hover p-6 rounded-2xl flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <div className={`mb-3 p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors ${tech.color}`}>
                <tech.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-white text-lg">{tech.name}</h3>
              <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest font-medium">
                {tech.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer/CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 text-center border-t border-white/5 pt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/10 hover:border-pink-500/50 transition-colors group cursor-pointer">
            <span className="text-zinc-300 font-medium">React</span>
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500 group-hover:scale-125 transition-transform" />
            <span className="text-zinc-300 font-medium">For More</span>
          </div>
          
          <div className="mt-8 text-zinc-600 text-sm font-mono">
            &copy; {new Date().getFullYear()} DANIAL TECH ECOSYSTEM. ALL RIGHTS RESERVED.
          </div>
        </motion.div>
      </div>
    </main>
  );
}
