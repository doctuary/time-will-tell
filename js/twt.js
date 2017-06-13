const repoPath = 'ipfs-' + Math.random()
// Create an IPFS node
const node = new Ipfs({
    init: false,
    start: false,
    repo: repoPath
})
// Init the node
node.init(handleInit)
function handleInit (err) {
    if (err) {
        throw err
    }
    node.start(() => {
        console.log('Online status: ', node.isOnline() ? 'online' : 'offline')
        document.getElementById("status").innerHTML= 'Node status: ' + (node.isOnline() ? 'online' : 'offline')
        // You can write more code here to use it. Use methods like 
        // node.files.add, node.files.get. See the API docs here:
        // https://github.com/ipfs/interface-ipfs-core/tree/master/API
    })
}

function saveJournalEntry() {
    let journalEntry = document.getElementById("journalEntry");
    journalEntry = journalEntry.value;
    node.files.add(new node.types.Buffer(journalEntry), function (err, res) {
      if (err || !res) {
        return console.error('Error - ipfs files add', err, res)
      }

      res.forEach(function(file) {        
        console.log("successfully stored", file);
        let status = document.getElementById("status");
        status.textContent = "Save successful: " + file.hash;
      })
    })    
}