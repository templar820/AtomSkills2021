import { Client } from '@elastic/elasticsearch';
import CONSTANT from './CONSTANT';

// export default new Client({ node: 'http://host.docker.internal:9200' });
export default new Client({ node: `http://${CONSTANT.POSTGRES_HOST}:9200` });
