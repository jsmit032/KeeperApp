const express = require('express');
const router = express.Router();

const PSUDO_NOTES = [
    {
      id: '1',
      title: "Delegation",
      content:
        "Q. How many programmers does it take to change a light bulb? A. None – It’s a hardware problem"
    },
    {
      id: '2',
      title: "Loops",
      content:
        "How to keep a programmer in the shower forever. Show him the shampoo bottle instructions: Lather. Rinse. Repeat."
    },
    {
      id: '3',
      title: "Arrays",
      content:
        "Q. Why did the programmer quit his job? A. Because he didn't get arrays."
    },
    {
      id: '4',
      title: "Hardware vs. Software",
      content:
        "What's the difference between hardware and software? You can hit your hardware with a hammer, but you can only curse at your software."
    }
  ];

router.get('/:nid', function(req, res, next){
    const noteId = req.params.nid;
    const note = PSUDO_NOTES.find(n => {
        return n.id === noteId;
    });

    if (!note) {
        const err = new Error('Could not find a note for provided id.');
        err.code = 404;
        throw err;
    }

    res.json({note});
});

module.exports = router;