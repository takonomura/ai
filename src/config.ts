type Config = {
	host: string;
	serverName?: string;
	i: string;
	channelId?: string;
	headers?: any;
	master?: string;
	wsUrl: string;
	apiUrl: string;
	keywordEnabled: boolean;
	reversiEnabled: boolean;
	notingEnabled: boolean;
	chartEnabled: boolean;
	serverMonitoring: boolean;
	welcomeFirstNote: boolean;
	checkEmojisEnabled?: boolean;
	checkEmojisAtOnce?: boolean;
	geminiProApiKey?: string;
	pLaMoApiKey?: string;
	prompt?: string;
	aichatRandomTalkEnabled?: boolean;
	aichatRandomTalkProbability?: string;
	aichatRandomTalkIntervalMinutes?: string;
	aichatGroundingWithGoogleSearchAlwaysEnabled?: boolean;
	mecab?: string;
	mecabDic?: string;
	memoryDir?: string;
};

import config from '../config.json' with { type: 'json' };

if (!config.wsUrl) config.wsUrl = config.host.replace('http', 'ws') + '/streaming?i=';
if (!config.apiUrl) config.apiUrl = config.host + '/api';

export default config as Config;
