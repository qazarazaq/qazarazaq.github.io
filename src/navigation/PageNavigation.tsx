import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type AnchorHTMLAttributes, type CSSProperties, type ReactNode } from 'react';
import { findCaseStudy } from '../data/caseStudies';
import '../case-study.css';
import { cancelSectionScroll } from '../lib/sectionScroll';

type LocationState = { project: string | null; key: number };
type TransitionState = { title: string; phase: 'cover' | 'reveal'; columns: number; rows: number; cells: { delay:number; shade:string }[] };
type Navigation = { location: LocationState; navigate: (href: string, title: string) => void };
const NavigationContext = createContext<Navigation | null>(null);
const scrollers=[".more-work-rail",".gold-evidence",".case-cover__field"];
const captureRegions=()=>Object.fromEntries(scrollers.flatMap(selector=>{const el=document.querySelector<HTMLElement>(selector);return el?[[selector,{left:el.scrollLeft,top:el.scrollTop}]]:[];}));
const currentProject = () => findCaseStudy(new URLSearchParams(location.search).get('project'))?.slug ?? null;
const pageTitle = (project: string | null) => project ? `${findCaseStudy(project)!.title} — Wildan Razaq` : 'Wildan Razaq — Product & UI/CX Designer';
function pixelGrid() {
  const columns=innerWidth<600?6:innerWidth<1000?8:12;
  const rows=Math.ceil(innerHeight/(innerWidth/columns));
  return {columns,rows,cells:Array.from({length:columns*rows},(_,index)=>({
    delay:Math.min(400,Math.round((index%columns+Math.floor(index/columns))*18+((index*17)%7)*9)),
    shade:['#9bbfe5','#b8d4f3','#cbe2f8','#a9cbee','#d7eafb'][(index*7+Math.floor(index/columns)*3)%5],
  }))};
}

export function PageNavigation({ children }: { children: ReactNode }) {
  const [route,setRoute] = useState<LocationState>(()=>({project:currentProject(),key:0}));
  const renderedProject=useRef(route.project);
  renderedProject.current=route.project;
  const [transition,setTransition] = useState<TransitionState | null>(null);
  const timers=useRef<number[]>([]), busy=useRef(false), generation=useRef(0);
  const clear = useCallback(()=>{timers.current.forEach(clearTimeout);timers.current=[];},[]);
  const restore = useCallback((hash:string, y?:number, regions?:Record<string,{left:number;top:number}>)=>{
    const token=++generation.current;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      if(token!==generation.current)return;
      let anchor:HTMLElement|null=null;
      try { anchor=hash?document.getElementById(decodeURIComponent(hash.slice(1))):null; } catch { /* Invalid fragments leave the page at its start. */ }
      if(regions)for(const [selector,position]of Object.entries(regions))document.querySelector(selector)?.scrollTo({...position,behavior:"instant"});
      if(y!==undefined)window.scrollTo({top:y,behavior:'instant'});
      else if(anchor)anchor.scrollIntoView({behavior:'instant'});
      else window.scrollTo({top:0,behavior:'instant'});
    }));
  },[]);
  const playTransition=useCallback((title:string,commit:()=>void,focusHeading=false)=>{
    clear();cancelSectionScroll();
    const focus=()=>{if(focusHeading)requestAnimationFrame(()=>document.querySelector<HTMLElement>('main h1')?.focus({preventScroll:true}));};
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){
      setTransition(null);busy.current=false;commit();focus();return;
    }
    busy.current=true;
    setTransition({title,phase:'cover',...pixelGrid()});
    timers.current.push(window.setTimeout(()=>{commit();setTransition(current=>current?{...current,phase:'reveal'}:null);},1050));
    timers.current.push(window.setTimeout(()=>{setTransition(null);busy.current=false;timers.current=[];focus();},1800));
  },[clear]);
  const navigate=useCallback((href:string,title:string)=>{
    if(busy.current)return;
    cancelSectionScroll();
    const target=new URL(href,location.href);
    if(target.origin!==location.origin)return;
    const project=findCaseStudy(target.searchParams.get('project'))?.slug??null;
    history.replaceState({...history.state,portfolioY:scrollY,portfolioRegions:captureRegions()},'',location.href);
    const commit=()=>{
      history.pushState({portfolioY:0,portfolioEntry:true},'',target.pathname+target.search+target.hash);
      setRoute(previous=>({project,key:previous.key+1}));
      restore(target.hash);
    };
    playTransition(title,commit,true);
  },[restore,playTransition]);
  useEffect(()=>{
    const previous=history.scrollRestoration;history.scrollRestoration='manual';
    const back=()=>{
      const project=currentProject(), hash=location.hash, state=history.state;
      const commit=()=>{
        setRoute(previous=>({project,key:previous.key+1}));
        restore(hash,state?.portfolioY,state?.portfolioRegions);
      };
      if(project!==renderedProject.current)playTransition(findCaseStudy(project)?.title??'Selected work',commit);
      else {clear();cancelSectionScroll();busy.current=false;setTransition(null);commit();}
    };
    addEventListener('popstate',back);
    return()=>{clear();generation.current++;history.scrollRestoration=previous;removeEventListener('popstate',back);};
  },[clear,restore,playTransition]);
  useEffect(()=>{
    document.title=pageTitle(route.project);
    const project=findCaseStudy(route.project);
    const description=document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if(description)description.content=project?project.introduction:'Wildan Razaq Ramadhan, a UI/CX designer at Bank Mandiri in Jakarta. Selected work in mobile banking, everyday services, and wholesale banking.';
  },[route.project]);
  const active=transition!==null;
  useEffect(()=>{
    if(!active)return;
    const overflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const content=document.getElementById('navigation-content');
    if(content)content.inert=true;
    return()=>{document.body.style.overflow=overflow;if(content)content.inert=false;};
  },[active]);
  const navigation=useMemo(()=>({location:route,navigate}),[route,navigate]);
  return <NavigationContext.Provider value={navigation}>
    <div id="navigation-content">{children}</div>
    {transition&&<div className="page-transition" data-phase={transition.phase} aria-hidden="true">
      <div className="page-transition__pixels" style={{gridTemplateColumns:`repeat(${transition.columns},1fr)`,gridTemplateRows:`repeat(${transition.rows},1fr)`}}>{transition.cells.map((cell,index)=><span key={index} style={{'--pixel-delay':`${cell.delay}ms`,'--pixel-color':cell.shade} as CSSProperties}/>)}</div>
      <p className="page-transition__title" key={transition.title}>{transition.title.split(' ').map((word,wordIndex)=><span className="page-transition__word" key={wordIndex}>{Array.from(word).map((letter,index)=><span key={index} style={{'--letter-delay':`${Math.min((wordIndex*5+index)*8,160)}ms`} as CSSProperties}>{letter}</span>)}</span>)}</p>
    </div>}
    <div className="visually-hidden" role="status" aria-live="polite">{transition?`Opening ${transition.title}`:''}</div>
  </NavigationContext.Provider>;
}
export function usePageNavigation(){const value=useContext(NavigationContext);if(!value)throw new Error('Missing page navigation');return value;}

export function PageLink({href,title,children,onClick,...props}:Omit<AnchorHTMLAttributes<HTMLAnchorElement>,'title'> & {href:string;title:string}) {
  const {navigate}=usePageNavigation();
  return <a href={href} {...props} onClick={event=>{
    onClick?.(event);
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||props.target==='_blank'||props.download)return;
    event.preventDefault();navigate(href,title);
  }}>{children}</a>;
}
export function ProjectLink({slug,children,...props}:AnchorHTMLAttributes<HTMLAnchorElement>&{slug:string}) {
  const project=findCaseStudy(slug);
  return <PageLink {...props} href={`/?project=${slug}`} title={project?.title??'Work'} data-project-link={slug}>{children}</PageLink>;
}

export function BackLink({children,className}:{children:ReactNode;className?:string}) {
  const {navigate}=usePageNavigation();
  return <a href="/#work" className={className} onClick={event=>{
    if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    if(history.state?.portfolioEntry){history.replaceState({...history.state,portfolioY:scrollY,portfolioRegions:captureRegions()},'',location.href);history.back();}
    else navigate('/#work','Selected work');
  }}>{children}</a>;
}
