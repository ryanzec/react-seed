//static resources
import './../index.html';
import './misc/ua-parser';
import './styles/main.scss';

//application bootstrap
import './router.jsx';

//NOTE: lets re-throw error by default
import {Promise} from 'bluebird';
import moment from 'moment-timezone';

Promise.onPossiblyUnhandledRejection(function(error){
  throw error;
});
