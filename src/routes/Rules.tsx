import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Rules() {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography>Universal Rules</Typography>
                </AccordionSummary>
                <AccordionDetails style={{textAlign: 'left'}}>
                        <ul>
                            <li>The only platforms allowed for competing in official races are on a real console or on Dolphin </li>
                            <li>Players playing on Dolphin must also adhere to the following rules</li>
                            <ul>
                                <li>FPS Display must be enabled at all times while racing</li>
                                <li>All emulator functions are forbidden. This includes, but is not limited to, speedups, frame advance, savestates, and the Dolphin Memory Engine</li>
                            </ul>
                            <li>Runners are responsible for ensuring that any cheats they may have configured are disabled for the race</li>
                            <ul>
                                <li>Any accidental activation of cheats will be treated as a breach of rules, even if no advantage is gained</li>
                            </ul>
                            <li> Runners are expected to use a Wii Remote with Wii Motion Plus Inside or Wii Motion Plus adapter and a nunchuck, or a third party equivalent with the same functionality (and no additional functionality)</li>
                            <li>Use of the other controllers on Dolphin is allowed with the following restrictions:</li>
                            <ul>
                                <li>Actions must be mapped to exactly one button</li>
                                <li>Motion inputs may be mapped to analog inputs</li>
                                <li>Analog inputs cannot be mapped to buttons</li>
                                <li>The racer must be able and willing to show a race moderator their control mapping at their request</li>
                            </ul>
                            <li>Racers may not view the spoiler log for any races where it may be generated, and are additionally prohibited from generating the spoiler log by any means for races where it is disabled.</li>
                            <li>Racers must not obtain spoilers by any means. This includes viewing the spoiler log, watching/listening to a restream or opponent(s) streams, or receiving information from anyone outside the race.</li>
                            <ul>
                                <li>If you receive spoilers in any way, you are expected to forfeit from the race.</li>
                                <li>If it is discovered that you knowingly received spoilers and did not forfeit, punitive action may be taken</li>
                            </ul>
                            <li>Any manual tracker is allowed. All autotrackers are banned</li>
                            <li>Runners must maintain their own tracker and notes</li>
                        </ul>
                        <b>The following rules supersede the universal rules for all Spoiler Log Races</b>
                        <ul>
                            <li>The spoiler log can be viewed at any time after the planning phase has begun. Logs cannot be viewed prior to the start of planning time.</li>
                        </ul>
                        <b>The following rules supersede the universal rules for all Cooperative race formats</b>
                        <ul>
                            <li>Racers are allowed to share information within their own team.</li>
                            <li>Racers may use a shared document for notes within their team</li>
                        </ul>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}