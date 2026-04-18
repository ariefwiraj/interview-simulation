import Link from "next/link"
import { BrainCircuit } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-10 border-t border-border bg-surface/30">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-text-muted">
          <BrainCircuit size={20} />
          <span className="font-semibold text-text">InterviewSim.ai</span>
          <span className="text-sm ml-2">© {new Date().getFullYear()}</span>
        </div>
        
        <div className="flex gap-6 text-sm text-text-muted">
          <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
