// SetTransform.js

import { createTransform } from 'redux-persist';
import {parse, stringify, toJSON, fromJSON} from 'flatted';

 
const SetTransform = createTransform(
    (inboundState, key) => stringify(inboundState),
    (outboundState, key) => parse(outboundState),
);
 
export default SetTransform;