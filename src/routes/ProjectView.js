import { useParams } from 'react-router-dom';

import { useProject } from '../hooks';

function ProjectView() {
  const { projectId } = useParams();
  const { data } = useProject(projectId);
  console.log(data);

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
