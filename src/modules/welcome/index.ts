import { bindThis } from '@/decorators.js';
import Module from '@/module.js';
import config from '@/config.js';

export default class extends Module {
	public readonly name = 'welcome';

	@bindThis
	public install() {
		if (!config.welcomeFirstNote) return {};

		const tl = this.ai.connection.useSharedConnection('localTimeline');

		tl.on('note', this.onLocalNote);

		return {};
	}

	@bindThis
	private onLocalNote(note: any) {
		if (note.isFirstNote) {
			setTimeout(() => {
				this.ai.post({
					renoteId: note.id
				});
			}, 3000);

			setTimeout(() => {
				this.ai.api('notes/reactions/create', {
					noteId: note.id,
					reaction: 'congrats'
				});
			}, 5000);
		}
	}
}
