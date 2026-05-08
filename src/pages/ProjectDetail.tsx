import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PROJECT_DATA, hackathons } from '../data/projects';
import SEO from '../components/SEO';
import AgriCertDetail from '../components/AgriCertDetail';
import COSDetail from '../components/COSDetail';
import PLMDetail from '../components/PLMDetail';
import ThreatLensDetail from '../components/ThreatLensDetail';
import FleetFlowDetail from '../components/FleetFlowDetail';
import LifeLensDetail from '../components/LifeLensDetail';
import CodingGitaDetail from '../components/CodingGitaDetail';
import AttendifyDetail from '../components/AttendifyDetail';
import MedClearDetail from '../components/MedClearDetail';
import ProjectDetailOverlay from '../components/ProjectDetailOverlay';
import { HackathonDetailOverlay } from '../components/HackathonExperience';

const DETAIL_COMPONENTS: Record<string, React.ComponentType<{ onClose: () => void }>> = {
  agricert: AgriCertDetail,
  cos: COSDetail,
  plmflow: PLMDetail,
  threatlens: ThreatLensDetail,
  fleetflow: FleetFlowDetail,
  lifelens: LifeLensDetail,
  codinggita: CodingGitaDetail,
  attendify: AttendifyDetail,
  medclear: MedClearDetail,
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const project = PROJECT_DATA.find(p => p.id === id);
  const hackathon = id?.startsWith('hackathon-') ? hackathons.find(h => h.id.toString() === id.replace('hackathon-', '')) : null;

  if (!id || (!DETAIL_COMPONENTS[id] && !project && !hackathon)) {
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
  const projectTitle = project?.headline || hackathon?.project || (id ? `${id.charAt(0).toUpperCase()}${id.slice(1)}` : 'Project');
  const projectDescription = project?.description || hackathon?.outcome || `Learn about ${projectTitle}, a project by Rachit Kakkad.`;
  const projectTech = project?.tech?.join(', ') || hackathon?.tech?.join(', ') || 'React, Node.js';

  const handleClose = () => {
    // If the window has an opener (was opened via target="_blank"), close it.
    if (window.opener) {
      window.close();
    } else {
      // Otherwise fallback to navigating home
      navigate('/');
    }
  };

  return (
    <div className="relative">
      <SEO 
        title={projectTitle}
        description={projectDescription}
        keywords={`${projectTitle}, Rachit Kakkad, AI Project, Portfolio, ${projectTech}`}
      />
      {DetailComponent ? (
        <DetailComponent onClose={handleClose} />
      ) : hackathon ? (
        <HackathonDetailOverlay hack={hackathon} onClose={handleClose} />
      ) : project ? (
        <ProjectDetailOverlay project={project} onClose={handleClose} />
      ) : null}
    </div>
  );
}
