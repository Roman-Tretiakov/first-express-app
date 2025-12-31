import {CreateVideoInputModel, UpdateVideoInputModel} from './video-input-dto';
import {ValidationError} from "../../types/validation-error-type";
import {AvailableResolutions} from "../../enums/available-resolutions";

export const createVideoInputDtoValidation = (data: CreateVideoInputModel): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!data.title)
        errors.push({field: 'title', message: 'Title is required'})
    else {
        if (Object.prototype.toString.call(data.title) !== '[object String]')
            errors.push({field: 'title', message: 'Title must be string'})
        if (data.title.trim().length < 2 || data.title.trim().length > 40)
            errors.push({field: 'title', message: 'Title must be between 2 and 40 symbols'});
    }

    if (!data.author)
        errors.push({field: 'author', message: 'Author is required'});
    else {
        if (Object.prototype.toString.call(data.author) !== '[object String]')
            errors.push({field: 'author', message: 'Author must be a string'});
        if (data.author.trim().length < 2 || data.author.trim().length > 20)
            errors.push({field: 'author', message: 'Author must be between 2 and 20 symbols'});
    }

    if (!data.availableResolutions)
        errors.push({field: 'availableResolutions', message: 'availableResolutions is required'});
    else {
        if (!Array.isArray(data.availableResolutions))
            errors.push({field: 'availableResolutions', message: 'availableResolutions must be array'});
        else if (data.availableResolutions.length) {
            const existingResolutions: AvailableResolutions[] = Object.values(AvailableResolutions);
            if (data.availableResolutions.length > existingResolutions.length ||
                data.availableResolutions.length < 1) {
                errors.push({field: 'availableResolutions', message: 'Invalid availableResolutions length'});
            }
            for (const resolution of data.availableResolutions) {
                if (!existingResolutions.includes(resolution as AvailableResolutions)) {
                    errors.push({
                        field: 'availableResolutions',
                        message: 'This resolution is not supported: ' + resolution,
                    });
                    break;
                }
            }
        }
    }
    return errors;
};

export const updateVideoInputDtoValidation = (data: UpdateVideoInputModel): ValidationError[] => {
    const errors: ValidationError[] = [];
    if (createVideoInputDtoValidation(data).length > 0) {
        errors.push(...createVideoInputDtoValidation(data));
        return errors;
    } else {
        if (!data.canBeDownloaded)
            errors.push({field: 'canBeDownloaded', message: 'canBeDownloaded is required'});
        else if (Object.prototype.toString.call(data.canBeDownloaded) !== '[object Boolean]') {
            errors.push({field: 'canBeDownloaded', message: 'canBeDownloaded must be boolean'});
        }

        if (!data.minAgeRestriction)
            errors.push({field: 'minAgeRestriction', message: 'minAgeRestriction is required'});
        else {
            if (Object.prototype.toString.call(data.minAgeRestriction) !== '[object Number]')
                errors.push({field: 'minAgeRestriction', message: 'minAgeRestriction must be number or null'});
            else if (data.minAgeRestriction !== null) {
                if (data.minAgeRestriction < 1 || data.minAgeRestriction > 18) {
                    errors.push({field: 'minAgeRestriction', message: 'minAgeRestriction must be between 1 and 18'});
                }
            }
        }

        if (!data.publicationDate)
            errors.push({field: 'publicationDate', message: 'publicationDate is required'})
        else if (Object.prototype.toString.call(data.publicationDate) !== '[object String]')
            errors.push({field: 'publicationDate', message: 'publicationDate must be string'});
        else {
            const date = new Date(data.publicationDate);
            if (isNaN(date.getTime()))
                errors.push({field: 'publicationDate', message: 'publicationDate must be valid date in ISO format'});
        }
    }
    return errors;
}