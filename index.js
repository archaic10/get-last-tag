const { Octokit } = require("@octokit/core")
const core = require('@actions/core');
const github = require('@actions/github')
const githubToken = core.getInput('github-token')
const octokit = new Octokit({ auth: githubToken})

async function run(){
    if(githubToken){
        findTag()
    }else{
        core.setFailed('The github-token parameter is required')
    }
}

async function findTag(){
    let param = {
        owner: github.context.actor,
        repo: github.context.payload.repository.name
    }
    await octokit.request('GET /repos/{owner}/{repo}/git/refs/tags', param).then((res)=>{
        if(res.status == 200){
            let last_tag = res.data.pop().ref.split('/').pop()
            console.log('The tag found is', last_tag)
            if(!validateTag(last_tag)){
                core.setFailed(`The tag ${last_tag} is not a tag valid `)
            }else{
                console.log(last_tag)
                core.setOutput("version", last_tag)
            }            
        }else{
            core.setFailed("No tags have been defined for your project. Set a tag and run the action again")
        }
    }).catch(()=>{
        console.log('Error executing the action, check the parameters passed and try again')
    })
}

function validateTag(tag){
    let defaulTag = tag.match('([v0-9|0-9]+).([0-9]+).([0-9]+).([0-9]+)')
    
    if(defaulTag){
        return tag
    }
    
    defaulTag = tag.match('([v0-9|0-9]+).([0-9]+).([0-9]+)')
    if(defaulTag){
        return tag
    }
    
    return false
}


run()