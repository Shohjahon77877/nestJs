import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ToLowerCase implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        value.username = value?.username.toLowerCase();
        return value;
    }
}