import './stylesheets/app.css';
import { PaperManager } from './PaperManager';

interface BoardManagerProps {
    scene: string;
}

export const BoardManager: React.FC<BoardManagerProps> = ({ scene }) => {
    return (
        <div className="cork-canvas">
            <PaperManager scene={scene}/>
        </div>
    );
};
