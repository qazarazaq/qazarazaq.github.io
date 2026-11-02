import { useEffect, useRef, useState } from 'react';
import { caseStudies, type CaseStudy as CaseData } from '../data/caseStudies';
import type { ProjectScreen } from '../data/portfolio';
import { BackLink, PageLink, ProjectLink } from '../navigation/PageNavigation';
import { ArrowLink, LinkArrow } from './ArrowLink';
import { DeviceImage, ScreenViewer } from './WorkMedia';
import { Footer } from './Footer';
import { useSceneMotion } from '../hooks/useSceneMotion';

function BackArrow(){return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6"/></svg>;}

export function CaseStudy({project}:{project:CaseData}) {
  useSceneMotion();
  const [preview,setPreview]=useState<ProjectScreen|null>(null);
  const pageRef=useRef<HTMLElement>(null);
  const next=caseStudies[(caseStudies.indexOf(project)+1)%caseStudies.length];
  useEffect(()=>{
    const page=pageRef.current;if(!page)return;
    let frame=0;
    const update=()=>{frame=0;const available=page.offsetHeight-innerHeight;page.style.setProperty('--case-progress',String(Math.max(0,Math.min(1,scrollY/Math.max(1,available)))));};
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);update();
    return()=>{cancelAnimationFrame(frame);removeEventListener('scroll',schedule);removeEventListener('resize',schedule);};
  },[]);
  const shot=(screen:ProjectScreen,priority=false)=><button type="button" className="work-visual case-shot" data-shot-motion={screen.width>screen.height?'desktop':screen.kind==='atm'?'atm':'phone'} aria-label={`Enlarge ${screen.title}`} onClick={()=>setPreview(screen)}><DeviceImage screen={screen} priority={priority} framing={screen.kind==='atm'?'console':'full'}/></button>;
  return <>
    <main ref={pageRef} id="main-content" className={`case-page${project.journey?'':' case-page--focused'}`}>
      <header className="case-nav">
        <nav className="site-nav container" aria-label="Project navigation">
          <BackLink className="case-back"><BackArrow/><span>Back</span></BackLink>
          <PageLink className="case-brand" href="/#top" title="Wildan Razaq"><img src="/assets/wildan-avatar.webp" alt="" width="32" height="32"/><span>Wildan Razaq</span></PageLink>
          <a className="case-email" href="mailto:qazarazaq@gmail.com">Let’s talk<LinkArrow/></a>
        </nav>
        <div className="case-read-progress" aria-hidden="true"/>
      </header>
      <section className="case-intro container" aria-labelledby="case-title">
        <h1 id="case-title" tabIndex={-1}>{project.title}</h1>
        <p className="case-lead">{project.headline}</p>
        <p className="case-introduction">{project.introduction}</p>
        <dl className="case-meta"><div><dt>At</dt><dd>{project.company}</dd></div><div><dt>My role</dt><dd>{project.role}</dd></div><div><dt>Platform</dt><dd>{project.platform}</dd></div></dl>
      </section>
      <div className={`case-cover container case-cover--${project.screens.length===1?(project.screens[0].width>project.screens[0].height?'desktop':'single'):'multiple'}`}>
        <div className="case-cover__field">{project.screens.map((screen,index)=><div key={screen.src} className="case-cover__device">{shot(screen,index===0)}</div>)}</div>
      </div>
      <section id="case-overview" className="case-overview container" aria-labelledby="case-overview-title" data-reveal>
        <div><h2 id="case-overview-title">The context</h2><p>{project.context}</p></div>
        <div><h2>My part</h2><p>{project.contribution}</p>{project.constraint&&<p>{project.constraint}</p>}</div>
      </section>
      {project.journey&&<section id="case-journey" className="case-journey container" aria-labelledby="case-journey-title" data-reveal>
        <div className="case-section-intro"><h2 id="case-journey-title">The journey</h2><p>{project.slug==='kopra-scm'?'A starting point, a way to narrow the list, and enough context to read each record.':project.slug==='livin-gold'?'Livin’ prepares the pickup. The ATM handles selection and collection.':'Dining mode and location set the context for browsing, ordering, and payment.'}</p></div>
        <ol>{project.journey.map(step=><li key={step.title}><span className="case-journey__dot" aria-hidden="true"/><div><h3>{step.title}</h3><p>{step.detail}</p></div></li>)}</ol>
      </section>}
      <div id="case-decisions" className="case-chapters container">
        {project.chapters.map((chapter,index)=><section key={chapter.title} className={`case-chapter${chapter.screen?'':' case-chapter--text'}${index%2?' case-chapter--reverse':''}`} aria-labelledby={`chapter-${index}`} data-reveal>
          <div className="case-chapter__copy"><h2 id={`chapter-${index}`}>{chapter.title}</h2>{chapter.paragraphs.map(p=><p key={p}>{p}</p>)}</div>
          {chapter.screen&&<div className={`case-chapter__media${chapter.crop?' case-chapter__media--detail':''}`}>
            {chapter.crop?<button className={`case-detail case-detail--${chapter.crop}`} type="button" aria-label={`Enlarge ${chapter.screen.title}`} onClick={()=>setPreview(chapter.screen!)}><img src={chapter.screen.src} alt={chapter.crop==='search'?'Invoice search and status filters':'Distinct invoice approval status labels'} width={chapter.screen.width} height={chapter.screen.height} loading="lazy"/></button>:shot(chapter.screen)}
          </div>}
        </section>)}
      </div>
      <section className="case-delivery container" aria-labelledby="delivery-title" data-reveal>
        <h2 id="delivery-title">In the product</h2><div><p>{project.delivery}</p>{project.publicUrl&&<ArrowLink href={project.publicUrl} external>See the live product</ArrowLink>}</div>
      </section>
      <section className="case-next container" aria-label="Next project">
        <ProjectLink slug={next.slug} className="case-next__link"><span>Next project</span><div><h2>{next.title}</h2><LinkArrow/></div></ProjectLink>
      </section>
    </main>
    <Footer/>
    {preview&&<ScreenViewer screen={preview} onClose={()=>setPreview(null)}/>}
  </>;
}
