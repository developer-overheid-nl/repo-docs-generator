import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  className?: string;
}

const TemplateSelector: FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const templates = ["SECURITY.md","CODE_OF_CONDUCT.md","LICENCE.md","publiccode.yml","README.md"];

  return (
    <select value={location.pathname} onChange={event => navigate(event.target.value)} className={className}>
      {templates.map(templateName => (
        <option key={templateName} value={`/${templateName}`}>
          {templateName}
        </option>
      ))}
    </select>
  );
};

export default TemplateSelector;
