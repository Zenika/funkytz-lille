const { useState } = React;

const competencesList = ['Programmation'];

function Zempire() {
    const [vampire, setVampire] = useState(() => {
        const initialCompetences = {};
        competencesList.forEach(comp => initialCompetences[comp] = 0);
        return {
            competences: initialCompetences
        };
    });

    const [humans, updateOpenspaceStatus] = useState(() => {
        return Array.from({ length: 10 }, (_, i) => ({
            id: i,
            competence: competencesList[Math.floor(Math.random() * competencesList.length)],
            competenceLevel: Math.floor(Math.random() * 5) + 1,
            clicked: false
        }));
    });

    const pickupHuman = (id) => {
        updateOpenspaceStatus(prev => prev.map(human =>
            human.id === id ? { ...human, clicked: true } : human
        ));
        const human = humans.find(h => h.id === id);
        if (human && !human.clicked) {
            setVampire(prev => ({
                ...prev,
                competences: {
                    ...prev.competences,
                    [human.competence]: prev.competences[human.competence] + human.competenceLevel
                }
            }));
        }
    };

    return (
        <div>
            <h1>Jeu du Vampire : Récupère les Compétences !</h1>
            <div id="stats">
                <p>Compétences gagnées :</p>
                {Object.entries(vampire.competences).map(([comp, count]) => (
                    <p key={comp}>{comp}: {count}</p>
                ))}
            </div>
            <div id="openspace">
                {humans.map(human => (
                    <div
                        key={human.id}
                        className={`human ${human.clicked ? 'clicked' : ''}`}
                        onClick={() => pickupHuman(human.id)}
                    >
                        👤
                    </div>
                ))}
            </div>
        </div>
    );
}

ReactDOM.render(<Zempire />, document.getElementById('root'));