import React, { useState }  from 'react';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Stop from '@material-ui/icons/Stop';

let audio = null
const lines = [
  "atha samādhi-pādaḥ",
  "atha yoga-anuśāsanam",
  "yogaḥ citta-vṛtti-nirodhaḥ",
  "tadā draṣṭuḥ svarūpe avasthānam",
  "vṛtti-sārūpyam itaratra",
  "vṛttayaḥ pañcatayyaḥ kliṣṭa-akliṣṭāḥ",
  "pramāṇa-viparyaya-vikalpa-nidrā-smṛtayaḥ",
  "pratyakṣa-anumāna-āgamāḥ pramāṇāni",
  "viparyayo mithyā-jñānam atadrūpa-pratiṣṭham"
]

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState(null)

  const controlAudio = (file_path) => {
    if (!isPlaying) {
      audio = new Audio(file_path)
      audio.play()
    } else  {
      audio.pause()
    }
    audio.onended = ()  => setIsPlaying(false)
    setIsPlaying(!isPlaying)
    setActiveLine(file_path)
  }

  const getIcon = (line) => {
    return (isPlaying && activeLine == line)  ? <Stop /> : <PlayArrow />
  }

  const mapLines = () => {
    return lines.map((line, index) => (
      <ListItem onClick={() => controlAudio(`sutra-1-${index}.mp3`)} button>
        <ListItemIcon>
          { getIcon(`sutra-1-${index}.mp3`) }
        </ListItemIcon>
        <ListItemText primary={line} />
      </ListItem>
    ))
  }

  return (

    <List component="nav" aria-label="main mailbox folders">
      { mapLines() }
    </List>
  );
}

export default App;
