user = User()
user.email = "slipknot@test.com"
user.password = "123456"
user.name = "corey"
user.last_name = "taylor"
user.band = True
user.description = "Slipknot es una banda estadounidense de metal alternativo formada en 1995 en Des Moines, Iowa, Estados Unidos. Sus integrantes en la actualidad son Corey Taylor, Craig Jones, Jim Root, Mick Thomson, Shawn Crahan y Sid Wilson. Slipknot es conocida por las máscaras características de cada uno de sus miembros, que cambian conforme han sacado más discografía. Sus miembros utilizan dos tipos de guitarra (principal y rítmica), un bajo, dos instrumentos de percusión personalizados, una batería e instrumentos electrónicos como sampler o mesas de mezclas. El sonido de la banda ha sido descrito como una máquina trilladora devorando un grupo de tambores militares.​ El vocalista Corey Taylor también incorpora diversos estilos vocales, como por ejemplo la voz gutural, el canto melódico y el rapeo, mientras que las letras en general tienen un tono agresivo. Las influencias de la banda incluyen, entre otros géneros, el death metal, el thrash metal y el heavy metal, aunque suelen ser incluidos con asiduidad dentro del metal alternativo y el nu metal. También fueron incluidos en el movimiento conocido como nueva ola de heavy metal americano. Los inicios de Slipknot se remontan al año 1992. La banda sufrió muchos cambios en su formación antes del lanzamiento de su primera demo Mate.Feed.Kill.Repeat en 1996, en el que el vocalista era Anders Colsefini. En 1999 la banda lanzó su exitoso debut homónimo con Corey Taylor como nuevo vocalista. Desde entonces, han publicado 6 álbumes de estudio: Slipknot (1999), Iowa (2001), Vol. 3: The Subliminal Verses (2004), All Hope Is Gone (2008), que debutó en la posición dentro del Billboard 200, .5: The Gray Chapter (2014) siendo este el segundo álbum de la banda en debutar en el número uno de Billboard 200, vendiendo 132.000 copias en su primera semana, y We Are Not Your Kind (2019). La banda ha lanzado cinco DVD, incluyendo Disasterpieces, del cual se han vendido 3 millones de copias en Estados Unidos. Slipknot ha vendido más de 20 millones de álbumes en todo el mundo."
user.experience = True
user.age = 50
user.artist_name_or_band_name = "Slipknot"
db.session.add(user)
db.session.commit()
print("User: ", user.email, " created.")
user.email = "incubus@test.com"
user.password = "123456"
user.name = "brandom"
user.last_name = "boyd"
user.band = True
user.description = "Incubus es una banda de rock alternativo 2​3​ estadounidense formado por el vocalista Brandon Boyd, guitarrista Mike Einziger y batería José Pasillas cuando estudiaban juntos y después expandieron con la inclusión del bajista Alex Dirk Lance Katunich y Gavin DJ Lyfe Koppell; ambos reemplazados finalmente por Ben Kenney y DJ Kilmore respectivamente. Para el 2001 tuvieron un enorme éxito con el sencillo Drive, seguido de su álbum Morning View."
user.experience = True
user.age = 50
user.artist_name_or_band_name = "Incubus"
db.session.add(user)
db.session.commit()
print("User: ", user.email, " created.")
user.email = "santana@test.com"
user.password = "123456"
user.name = "carlos"
user.last_name = "santana"
user.band = False
user.description = "Carlos Humberto Santana Barragan (Autlán de Navarro, Jalisco; 20 de julio de 1947) es un guitarrista mexicano nacionalizado estadounidense.1​ En 1966 fundó la banda Santana, pionera en fusionar la música latina con el rock.Santana ha vendido más de 100 millones de álbumes en todo el mundo (contando las ventas de su banda y su carrera en solitario). Ha ganado diez premios Grammy y tres premios Grammy Latino.2​ Está casado con Cindy Blackman, conocida por ser baterista de Lenny Kravitz. Su hermano Jorge Santana también fue músico, reconocido por ser uno de los fundadores de la agrupación Malo.​"
user.experience = True
user.age = 50
user.artist_name_or_band_name = "Santana"
db.session.add(user)
db.session.commit()
print("User: ", user.email, " created.")
user.email = "gelomamo@test.com"
user.password = "123456"
user.name = "angel"
user.last_name = "fernandez"
user.band = False
user.description = "Soy Nuevo en esto​"
user.experience = False
user.age = 35
user.artist_name_or_band_name = "Angel Fernandez"
db.session.add(user)
db.session.commit()
print("User: ", user.email, " created.")
user.email = "elycruz@test.com"
user.password = "123456"
user.name = "ely"
user.last_name = "cruz"
user.band = False
user.description = "Soy un genio a la guitarra"
user.experience = True
user.age = 35
user.artist_name_or_band_name = "Ely Cruz"
db.session.add(user)
db.session.commit()
print("User: ", user.email, " created.")
user.email = "muchachitobomboinfierno@test.com"
user.password = "123456"
user.name = "Jairo"
user.last_name = "Perera"
user.band = False
user.description = "Jairo empezó su carrera como músico de calle, por lugares tan distintos como Lloret de Mar, Barcelona o París. Más tarde formó el grupo Trimelón de Naranjus, con varios amigos, y grabó dos discos en los años 1997 y 2000. Tras la disolución del grupo, ha hecho espectáculos por los bares mezclando su música, monólogos y boxeo en un pequeño cabaré que ha paseado el Rumboxing (rumba, swing y combate cuerpo a cuerpo) por ciudades como Madrid, Burgos o Palma de Mallorca."
user.experience = True
user.age = 35
user.artist_name_or_band_name = "Muchachito Bombo Infierno"
db.session.add(user)
db.session.commit()
print("User: ", user.email, " created.")



