import React from 'react'
import type { ErrorInfo, ReactNode } from 'react'
interface Props { children: ReactNode }
interface State { error: Error | null; componentStack: string }
export default class AppErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null, componentStack: '' }
  static getDerivedStateFromError(error: Error): State { return { error, componentStack: '' } }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('AgentPulse render failure:', error, info.componentStack); this.setState({ componentStack: info.componentStack ?? '' }) }
  render() {
    if (this.state.error) return <main style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:24,background:'#070a12',color:'#e2e8f0',fontFamily:'system-ui,sans-serif'}}><section style={{width:'min(620px,100%)',padding:28,border:'1px solid #334155',borderRadius:12,background:'#0d1423'}}><p style={{color:'#fbbf24',fontSize:12,letterSpacing:2}}>AGENTPULSE RECOVERY</p><h1 style={{margin:'8px 0',fontSize:24}}>The workspace encountered an error.</h1><p style={{color:'#94a3b8',lineHeight:1.6}}>The page was protected from a blank-screen failure. Share the diagnostic message below if the problem continues.</p><pre style={{overflowWrap:'anywhere',whiteSpace:'pre-wrap',padding:12,borderRadius:8,background:'#070a12',color:'#fca5a5',fontSize:12}}>{this.state.error.stack||this.state.error.message||'Unknown rendering error'}\n{this.state.componentStack}</pre><button onClick={()=>window.location.reload()} style={{marginTop:12,padding:'10px 16px',border:0,borderRadius:6,background:'#7c3aed',color:'white',cursor:'pointer'}}>Reload workspace</button></section></main>
    return this.props.children
  }
}
