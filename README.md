# ClientDex
- Built at UofT Hacks 11

## Inspiration
Network and timing is everything in the world of sales. Talk to the right people, about the right things, at the right time, and you've got a deal. Today, many sales teams leverage internet and big data to form networks of unprecedented scales. Yet, they often fall short in making the most of their clientele — it can become incredibly overwhelming with the volume of connections to constantly maintain. But what if there was a solution to this, that only required just a click of a button (or your voice)? Introducing ClientDex, the classic stationary business card organizer turned digital.

## What it does
ClientDex is an all-in-one tool designed to help you stay seamlessly connected with your clients! With ClientDex, you can categorize your clients, be reminded of when to set up a meeting with them, and most importantly, ensure you never miss a beat with client interactions. It's equipped with AI-powered audio search features to suggest contacts based on description and information you've noted down. Additionally, ClientDex will automatically remind you to set up a meeting with them, after a certain threshold you define. All these features reside on a classy, rolodex-themed site; truly nostalgic!

## How we built it
ClientDex is built with React on the frontend and Python Flask, MongoDB, AssemblyAI, and Cohere API for the backend.

## Challenges we ran into
A few challenges we ran into was setting up the backend, since none of us knew Python Flask prior to this hackathon. It was also difficult to set up the voice translation since different formats of audio needed to be treated differently.

## Accomplishments that we're proud of
We fully set up our voice searching functionality using the Cohere API
We successfully set up our backend and connected in to MongoDB
What we learned
We learned many new skills, such as Python Flask for some team members, and working with MongoDB for others. As well, for many of us, it was our first time venturing with AI!

## What's next for ClientDex
Given more time, we're hoping to implement the ability to add new contacts by voice so sales reps can create contacts much more easily. We may also try to automatically create contacts during first meetings online through voice recognition.
