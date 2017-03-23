## Blog Data Service

###What's this
I always wanted my blog to be editable on github, anybody should be able to submit a PR to any of my articles to improve them or fix typos (I make lots of typos!) but I never liked any of the architectural model out there to manage content from github, therefore I wanted to build my own, won't be as good as other solutions out there but it'll be good enough for me and will fit my needs!

### How it works
The main idea here is to have a solution that once it's up and running looks after itself, the blog will be done in my spare time and I'll not have the time to have an enterprise solution done if I don't invest time on it, i also wanted to dig further into the Serverless architechture so I'm catching two birds with one stone.

Github has webhooks that allows any  change made to a repository to be notified to a remote endpoint, so what if the endpoint is froma  serverless application that parses the update, and store (CRUD) the content into a DB ready to be serverd? that's what I'm aiming for!


