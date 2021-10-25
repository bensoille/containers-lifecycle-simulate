# Node Rest API : container lifecycle simulation

This project is a REST API with Node.js and Express.
> This repository is used when deploying with charm to juju, see paragraph below. However, it can be run locally with npm, leveraging nodemon node workflow.



## Routes
- **GET /containers** : get the list of running containers
```json
[
    {
      "_id": "6175fd10f840bf0e6da6244e",
      "application": "pouaite2",
      "status": "ERROR",
      "id": "f44a1e39-8e91-4f7d-8ec2-4824675fafd7",
      "createdAt": "2021-10-25T00:40:48.582Z",
      "updatedAt": "2021-10-25T00:41:28.588Z",
      "__v": 0
    },
]
```

- **POST /containers** : start an application in a container with payload `{application:"application-name"}`  
Returns details about started container :
```json
{
    "_id":"6175fd0ff840bf0e6da6244a",
    "application":"application-name",
    "status":"STARTING",
    "id":"0dccca44-8945-4f09-aff5-c28ad11b7aa4",
    "createdAt":"2021-10-25T00:40:47.011Z",
    "updatedAt":"2021-10-25T00:40:47.011Z",
    "__v":0
}
```
> Containers are *STARTING* (20s), then *RUNNING*, then eventually *ERROR* (after 20s)  
> Some containers will error after some amount of time, on random, on purpose

- **DELETE /containers** : stop running application's containers with payload `{application:"application-name"}`  
Returns details about stopped containers :
```json
[
    {
      "_id": "61760480f840bf0e6da62461",
      "application": "pouaite3",
      "status": "RUNNING",
      "id": "efd53be2-9ef5-45eb-b22f-be9c8b19b614",
      "createdAt": "2021-10-25T01:12:32.340Z",
      "updatedAt": "2021-10-25T01:12:52.348Z",
      "__v": 0
    },
    {
      "_id": "61760481f840bf0e6da62465",
      "application": "pouaite3",
      "status": "RUNNING",
      "id": "6ecc2558-edc8-4c9e-bf3e-3e4693089544",
      "createdAt": "2021-10-25T01:12:33.187Z",
      "updatedAt": "2021-10-25T01:12:53.205Z",
      "__v": 0
    },
]
```
> Containers are *STOPPING*, then *TERMINATED*  
> Multiple containers can be *RUNNING* with same application name

## Prerequisites
- Node.js 10+
- NPM
- some running mongodb service (not when using via charm)

## Local installation and run
- Install dependencies
```bash
npm install
```
- Eventually edit config file at `src/config/config.js` and fill in your mongodb details (not when using via charm)
  
- Start Application
```bash
npm start
```
> The application will be launched by [Nodemon](https://nodemon.com) so it will be restarted automatically on file change.

## Deploy to juju : Charm ready
This project is deployed via a juju charm, see this [deployment repository](https://github.com/bensoille/juju-nodejs-deployment).  
The linked [deployment repository](https://github.com/bensoille/juju-nodejs-deployment) uses charmed framework for automatic deployment and setup to a juju managed infrastructure.

## To do

- make a docker file and make it easy to run anywhere