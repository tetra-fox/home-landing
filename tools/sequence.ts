import { preprocess } from "svelte/compiler";
import { PreprocessorGroup } from "svelte/types/compiler/preprocess";

/**
 * A wrapper for other Svelte preprocessors that will run them in sequence.
 * @param preprocessors An array of Svelte preprocessor objects.
 * @returns Processed code.
 * 
 * [Source](https://gist.github.com/bluwy/5fc6f97768b7f065df4e2dbb1366db4c#file-sequence-ts)
 */
export default function sequence(
    preprocessors: PreprocessorGroup[]
): PreprocessorGroup[] {
    return preprocessors.map((preprocessor) => ({
        markup({ content, filename }) {
            return preprocess(content, preprocessor, { filename });
        }
    }));
}