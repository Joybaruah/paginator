## Usage

```js
import { Paginator, PaginatedResponse } from "paginator-v1";

// Initialize a new Paginator
const page = 1;

const query = YourMongoModel.find({});
const Paginator = new Paginator(query);

let paginated_response: PaginatedResponse = await Paginator.getPaginatedResponse(page);
// Returns
{
    result: [
        object,
        ...
    ];
    hasNextPage: false;
    hasPreviousPage: false;    
}

```
