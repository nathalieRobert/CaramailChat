import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {CTX} from './Store';
import logo from '../img/LycosLogo.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    background: 'radial-gradient(rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
      margin: '5%',
      marginLeft: '20%',
      marginRight: '20%',
    padding: theme.spacing(3, 2),
  },

  title: {
    color: 'brown',
    marginTop: '5%',

},

  flex: {
   display: 'flex',
   alignItems:'center',
   margin: '1%'
},

topicWindow: {
    width: '30%',
    height: '300px',
    borderRight: 'solid 1px grey',
    
 },

 chatWindow: {
    width: '70%',
    height: '300px',
    padding:'25px'
 },

 chatBox: {
    width: '85%',
    
 },

 button: {
    width: '15%',
    
 },
}));

export default function Dashboard(){
    const classes = useStyles();

    //CTX store
    const {allChats, SendChatAction, user} = React.useContext(CTX);
    const topics = Object.keys(allChats);

    const [activeTopic, changeActiveTopic] = React.useState(topics[0])
    const [textValue, changeTextValue] = React.useState('');

    return(
    <div >
        <Typography className={classes.title} variant="h3" component="h3" align='center'>
      
                   <img src={logo} alt= 'logo' width='25%'/>
                   
        </Typography>

        <Paper className={classes.root}>
                
                <Typography variant="h6" component="h5" align='center'>
             
                 {activeTopic}
                </Typography>
        

                <div className={classes.flex}>
                    <div className={classes.topicWindow}>
                            
                       
                        <List>
                           {
                               topics.map(topic => (
                                <ListItem onClick={e => changeActiveTopic(e.target.innerText)} key={topic}  button>
                                 <ListItemText primary={topic} />
                                </ListItem>
                               ))
                           }
                        </List>
                        </div>
                        
                        <div className={classes.chatWindow}>

                        {
                           
                               allChats[activeTopic].map((chat, i) => (
                                    <div className={classes.flex} key={i}> 
                                        <Chip label={chat.from}   className={classes.topicChip}/>
                                        <Typography variant="p" component="h5" align='center'>
                                            {chat.msg}
                                        </Typography>
                                    </div>
                               )) 
                           }        
                        </div>
                </div>

                <div className={classes.flex}>
                <TextField
                    label="Send a chat"
                    className={classes.chatBox}
                    value={textValue}
                    onChange={e => changeTextValue(e.target.value)}
                />
                <Button variant="contained" 
                        color="primary" c
                        lassName={classes.button} 
                        onClick={() => 
                        {SendChatAction({from:user, msg: textValue, topic: activeTopic});
                         changeTextValue('');
                        }

                }>
                    Send
                </Button>
                </div>
         </Paper>
    </div>

    )

}