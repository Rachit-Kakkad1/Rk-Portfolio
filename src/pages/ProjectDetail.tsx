import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PROJECT_DATA } from '../data/projects';
import SEO from '../components/SEO';
import AgriCertDetail from '../components/AgriCertDetail';
import COSDetail from '../components/COSDetail';
import PLMDetail from '../components/PLMDetail';
import ThreatLensDetail from '../components/ThreatLensDetail';
import FleetFlowDetail from '../components/FleetFlowDetail';
import LifeLensDetail from '../components/LifeLensDetail';
import CodingGitaDetail from '../components/CodingGitaDetail';
import AttendifyDetail from '../components/AttendifyDetail';
import ProjectDetailOverlay from '../components/ProjectDetailOverlay';

const DETAIL_COMPONENTS: Record<string, React.ComponentType<{ onClose: () => void }>> = {
  agricert: AgriCertDetail,
  cos: COSDetail,
  plmflow: PLMDetail,
  threatlens: ThreatLensDetail,
  fleetflow: FleetFlowDetail,
  lifelens: LifeLensDetail,
  codinggita: CodingGitaDetail,
  attendify: AttendifyDetail,
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const project = PROJECT_DATA.find(p => p.id === id);

  if (!id || (!DETAIL_COMPONENTS[id] && !project)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F2ED] text-black">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">Project Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-black text-white rounded-full uppercase text-xs font-bold tracking-widest hover:scale-105 transition-transform"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const DetailComponent = DETAIL_COMPONENTS[id];
  const projectTitle = project?.headline || (id ? `${id.charAt(0).toUpperCase()}${id.slice(1)}` : 'Project');

  return (
    <div className="relative">
      <SEO 
        title={projectTitle}
        description={project?.description || `Learn about ${projectTitle}, a project by Rachit Kakkad featuring ${project?.tech?.join(', ') || 'modern technologies'}.`}
        keywords={`${projectTitle}, Rachit Kakkad, AI Project, Portfolio, ${project?.tech?.join(', ') || 'React, Node.js'}`}
      />
      {DetailComponent ? (
        <DetailComponent onClose={() => navigate('/')} />
      ) : project ? (
        <ProjectDetailOverlay project={project} onClose={() => navigate('/')} />
      ) : null}
    </div>
  );
}
