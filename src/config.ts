type Config = {
	host: string;
	i: string;
	channelId?: string;
	headers?: any;
	master?: string;
	wsUrl: string;
	apiUrl: string;
	keywordEnabled: boolean;
	reversiEnabled: boolean;
	chartEnabled: boolean;
	serverMonitoring: boolean;
	mecab?: string;
	mecabDic?: string;
};

const config = require('../config.json');

if (!config.wsUrl) config.wsUrl = config.host.replace('http', 'ws') + '/streaming?i=';
if (!config.apiUrl) config.apiUrl = config.host + '/api';

export default config as Config;
