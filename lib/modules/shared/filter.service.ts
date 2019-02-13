import * as blns from '../../bin/data/blns.json';
import * as emojistrip from 'emoji-strip';
import * as stripTags from 'striptags';

export class FilterService {

    /**
     * @description converts incoming string to string without the defined symbols.
     * Please note that this filter is very unclean & brutal.
     */
    public removeSymbolsFromString(input: string): string {
        return input.replace(/[`~!@#$%^&*()_|+=?;:'",<>\{\}\[\]\\\/]/gi, '');
    }

    /**
     * @alias 'silvesterfilter'
     * removes Emoji's from a string.
     * @returns {string} */
    public removeEmojisFromString(input: string): string {
        return emojistrip(input);
    }

    /**
     * @description strips HTML from an input string.
     * @returns {string}
     */
    public stripHtml(input: string): string {
        return stripTags(input);
    }

}
