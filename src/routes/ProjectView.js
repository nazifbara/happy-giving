import { useParams } from 'react-router-dom';

function ProjectView() {
  const { projectId } = useParams();

  return <h1>Project {projectId}</h1>;
}

const route = {
  name: 'ProjectView',
  props: {
    path: '/project/:projectId',
    element: <ProjectView />,
  },
};

export default route;
