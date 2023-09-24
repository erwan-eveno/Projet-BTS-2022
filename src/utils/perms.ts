interface Perm {
	name: string
	desc: string
	section: string
}

export const PermsConfig: Perm[] = [
	{ name: 'dev', desc: 'Permission de developpeur.', section: 'Gestion des utilisateurs' },
	{ name: 'user.see', desc: 'Voir tous les utilisateurs.', section: 'Gestion des utilisateurs' },
	{ name: 'user.create', desc: 'Créer un nouvel utilisateurs.', section: 'Gestion des utilisateurs' },
	{ name: 'user.delete', desc: 'Supprimer un utilisateur.', section: 'Gestion des utilisateurs' },
	{ name: 'user.manage', desc: 'Modifier un utilisateur.', section: 'Gestion des utilisateurs' },
	{ name: 'user.see.*', desc: "Voir toutes les informations d'un utilisateurs.", section: 'Gestion des utilisateurs'}, // DANGEROUS

	// Dish
	{ name: 'dish.create', desc: 'Créer de nouveaux plats.', section: 'Gestion des plats' },
	{ name: 'dish.see', desc: 'Voir les plats.', section: 'Gestion des plats' },
	{ name: 'dish.delete', desc: 'Supprimer un plat.', section: 'Gestion des plats' },
	{ name: 'dish.tags.see', desc: 'Voir les étiquettes associées à un plat.', section: 'Gestion des plats' },
	{ name: 'dish.tags.create', desc: 'Créer de nouvelles étiquettes.', section: 'Gestion des plats' },

	// Menus
	{ name: 'menus.create', desc: 'Créer un nouveau menu.', section: 'Gestion des menus' },
	{ name: 'menus.see', desc: 'Voir tous les menus.', section: 'Gestion des menus' },
	{ name: 'menus.delete', desc: 'Supprimer un menu.', section: 'Gestion des menus' },

	// Avis
	{ name: 'avis.see', desc: 'Voir tous les avis.', section: 'Gestion des avis' }
]