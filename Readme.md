## Blog Data Service

###What's this
I always wanted my blog to be editable on github, anybody should be able to submit a PR to any of my articles to improve them or fix typos (I make lots of typos!) but I never liked any of the architectural model out there to manage content from github, therefore I wanted to build my own, won't be as good as other solutions out there but it'll be good enough for me and will fit my needs!

### How it works
The main idea here is to have a solution that once it's up and running looks after itself, the blog will be done in my spare time and I'll not have the time to have an enterprise solution done if I don't invest time on it, i also wanted to dig further into the Serverless architechture so I'm catching two birds with one stone.

GitHub has webhooks that allows any  change made to a repository to be notified to a remote endpoint, so what if the endpoint is froma  serverless application that parses the update, and store (CRUD) the content into a DB ready to be serverd? that's what I'm aiming for!

### Lifecycle
After any PR is merged GitHub will send the payload to a remote endpoint, each file must follow a Jekyll style header in order to enrich the content with anything that a blog post might need, the content and metadata it's then stored into a DynamoDB database ready to be served.
Any update to the files will be process and the content in the DB updated, I don't have a plan to support delete yet, I'll think of something once everything it's up an running.

### Roadmap
1. Have the GitHub intergation done and deployed
2. Create a service that will expose some RESTful endpoint to serve the content of the blog
3. Create the FrontEnd for the blog, it will be a Polymer PWA
4. Store the content in a better storage system, for now I'm thinking ElastiSeatchi
5. See how it goes and improve it!
