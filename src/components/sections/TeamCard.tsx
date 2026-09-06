import { InstagramIcon } from "@/components/icons/InstagramIcon";
import type { TeamMember } from "@/types";

/** Um card do grid do time: foto, cargo, nome, bio e link social. */
export function TeamCard({ member }: { member: TeamMember }) {
  const classes = [
    "magic-bento-card",
    "magic-bento-card--text-autohide",
    "magic-bento-card--border-glow",
    "person-card",
    member.featured ? "card-ceo" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className="team-bento-photo">
        <img
          className="team-photo"
          src={member.photo}
          alt={member.name}
          style={
            member.photoPosition ? { objectPosition: member.photoPosition } : undefined
          }
        />
      </div>

      <div className="magic-bento-card__header">
        <div className="magic-bento-card__label">{member.role}</div>
      </div>

      <div className="magic-bento-card__content">
        <h3 className="magic-bento-card__title">{member.name}</h3>
        <p className="magic-bento-card__description">{member.bio}</p>
        <div className="card-social">
          <a href={member.social.href} aria-label={member.social.ariaLabel}>
            <InstagramIcon />
            {member.social.handle}
          </a>
        </div>
      </div>
    </div>
  );
}
