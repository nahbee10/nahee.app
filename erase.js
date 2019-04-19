router.delete('/api/sex/:partner_id', function(req, res){
    Sex.deleteMany({ _partner_id: req.params.partner_id }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });
        res.status(204).end();
    })
});

router.delete('/api/orgasm/:partner_id', function(req, res){
    Orgasm.deleteMany({ _partner_id: req.params.partner_id }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });
        res.status(204).end();
    })
});