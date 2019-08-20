import emojistrip from 'emoji-strip';
import stripTags from 'striptags';

export class FilterService {

    /**
     * @alias 'silvesterfilter'
     * removes Emoji's from a string. */
    public removeEmojisFromString(input: string): string {
        return emojistrip(input);
    }

    /**
     * @description strips HTML from an input string.
     */
    public stripHtml(input: string): string {
        return stripTags(input);
    }

}
