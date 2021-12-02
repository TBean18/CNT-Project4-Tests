module.exports = {
  commandArray: [
    [
      `select snum, sname
    from suppliers
    where not exists
        ( select *
            from parts
          where not exists
            ( select *
              from shipments
              where shipments.snum = suppliers.snum
                    and shipments.pnum = parts.pnum
            )
        );`,
      "Command 1",
    ],
    [
      `select *
from suppliers;`,
      "Command 2A",
    ],
    [
      `insert into shipments
values ('S5', 'P6', 'J7', 400);`,
      "Command 2B",
    ],
    [
      `select *
from suppliers;`,
      "Command 2C",
    ],
    [
      `select *
from suppliers;`,
      "Command 3A",
    ],
    [
      `insert into suppliers
values ('S39','Candice Swanepoel',10,'Cardiff')`,
      "Command 3B",
    ],
    [
      `select *
from suppliers;`,
      "Command 3C",
    ],
    [
      `insert into shipments
values ('S39','P3','J1', 20);`,
      "Command 3D",
    ],
    [
      `select *
from suppliers;`,
      "Command 3E",
    ],
    [
      `select distinct suppliers.snum, suppliers.sname, shipments.pnum
from suppliers natural join shipments
where shipments.pnum in
    (select pnum
     from parts
     where not exists
        (select * 
         from jobs
         where not exists
            (select *
             from shipments
             where shipments.snum = suppliers.snum
                   and shipments.pnum = parts.pnum
                   and shipments.jnum = jobs.jnum
			)
		) 
	);
`,
      "Command 4",
    ],
    [
      `select * 
from suppliers;`,
      "Command 5A",
    ],
    [
      `select *
from shipments;
`,
      "Command 5B",
    ],
    [
      `update shipments
set quantity = quantity + 10
where pnum = 'P3';
`,
      "Command 5C",
    ],
    [
      `select *
from shipments;
`,
      "Command 5D",
    ],
    [
      `select *
from suppliers;
`,
      "Command 5E",
    ],
    [
      `select sname
from suppliers
where snum in (select snum
               from shipments
			   where pnum in
			                 (select pnum 
							  from parts
							  where color = 'green'
							  )
				)
	and
		snum not in (select snum
		             from shipments
					 where pnum in
					               (select pnum
								    from parts
									where color <> 'green'
									)
					);
	`,
      "Command 6",
    ],
    [
      `select alpha
from jobs;		

`,
      "Command 7",
    ],
    [
      `update jobs
set city = "Madrid" 
where city = "Paris"		
`,
      "Command 8",
    ],
    [
      `select *
from jobs;
 `,
      "Command 9",
    ],
    [
      `select count(*) as total_shipments
 from shipments;
`,
      "Command 10",
    ],
  ],
  Command1: `select snum, sname
    from suppliers
    where not exists
        ( select *
            from parts
          where not exists
            ( select *
              from shipments
              where shipments.snum = suppliers.snum
                    and shipments.pnum = parts.pnum
            )
        );`,
};
