import select from 'select-dom';
import linkifyIssues from 'linkify-issues';
import observeEl from '../libs/simplified-element-observer';
import {editTextNodes} from './linkify-urls-in-code';

export default function () {
	const isRed = !!location.href.match(/github\.com\/Redisrupt/);
	observeEl(select('#partial-discussion-header').parentNode, () => {
		const title = select('.js-issue-title:not(.refined-linkified-title)');
		if (title) {
			title.classList.add('refined-linkified-title');
			let titleText = title.textContent;
			if (isRed && /(CPM[- ]\d*)/.test(titleText.toUpperCase()) && !title.classList.contains('linkedText') ) {
				title.classList.add('linkedText')
				titleText = titleText.replace(/(CPM[- ]\d*)/g, `<a target="blank" href="https://redisrupt.atlassian.net/browse/$1">$1</a>`);
				title.innerHTML = titleText;
			}
			editTextNodes(linkifyIssues, title);
		}
	});
}
