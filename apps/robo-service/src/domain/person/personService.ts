import { CreatePersonInputModel, Db, PersonModel } from '../../database/db';
import Fuse from 'fuse.js';

export type PersonFilter = {
    /**
     * Case-insensitive exact matches will be returned
     * @example
     * // The database contains ['bill', 'Bill', 'billy',]
     * // This filter will return [ 'bill', 'Bill' ];
     * const matches = await userService.find({ strictName: 'bill' });
     */
    name?: string;
    // qualifications?: string[],
};

const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: ['name'],
};

export class PersonService {
    constructor(private db: Db) {}

    /**
     * Get a single Person by ID
     */
    public async get(id: string) {
        return await this.db.person(id);
    }

    /**
     * find users that match the filter criteria
     *
     */
    public async find(filter: PersonFilter): Promise<PersonModel[]> {
        // TODO: Only return people that matches ALL the provided filters (multiple filters joined with AND)
        throw new Error('personService.find() is not implemented');
        const matches = [];

        if (filter.name) {
            // matches = this.db.person()
        }
        return [];
    }

    /**
     *
     */
    public async fuzzySearchByName(
        nameHint: string,
        limit: number = 10
    ): Promise<PersonModel[]> {
        const fuse = new Fuse(await this.db.people(), fuseOptions);
        const results = fuse.search(nameHint, {
            limit,
        });

        return results.map((fuseResult) => fuseResult.item);
    }

    /**
     *
     */
    public async create(
        personInput: CreatePersonInputModel
    ): Promise<PersonModel> {
        // TODO: make sure that the permissions allow the new person to be created in the requested group
        return await this.db.createPerson(personInput);
    }

    /**
     * ridicule yourself
     */
    public ridicule() {
        console.log("You look ridculous");
    }
}
