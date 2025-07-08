import { SourceLanguageCode, TargetLanguageCode } from "deepl-node";

export class TranslatorDto{
    content: string;
    source: SourceLanguageCode | null;
    target: TargetLanguageCode;
}