[![Build Status](https://travis-ci.org/dudeka-team/potracheno.svg)](https://travis-ci.org/dudeka-team/potracheno)
# dudeka

## Getting started

```bash
$ npm i
$ npm start # starts development server
$ npm run start:storybook # starts react-storybook server
$ npm run build # builds project
$ ANALYZE=true npm run build # builds project and starts webpack bundle analyzer server
```

## Workflow

- Branch name is the number of issue (**issue-***).
- One single commit for every subtask or task if there are no subtasks. Сommit message starts with the task number (**[#1]**). Text of message is the task or the subtask name.
- PullRequest text is the task name (**[#1] Do something**).
