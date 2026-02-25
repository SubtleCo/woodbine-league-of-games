import { Box, Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { childGamesByParent, topLevelGames } from '../data/games';

export default function StoreSidebar({ currentSlug }) {
  return (
    <Box component="aside" className="store-sidebar">
      <Typography variant="h3" sx={{ fontSize: '1rem', mb: 1 }}>
        Game List
      </Typography>

      <Box className="store-card-stack">
        {topLevelGames.map((game, index) => {
          const childGames = childGamesByParent[game.slug] ?? [];
          const isParentActive = game.slug === currentSlug;
          const isChildActive = childGames.some((childGame) => childGame.slug === currentSlug);
          const isExpanded = isParentActive || isChildActive;
          const parentPrefix = `${game.name}: `;

          return (
            <Box key={game.slug} className={`store-stack-card ${isExpanded ? 'active' : ''}`} sx={{ zIndex: index + 1 }}>
              <MuiLink
                component={RouterLink}
                to={`/stuffwelike/${game.slug}`}
                className={`store-rail-link ${isParentActive ? 'active' : ''}`}
                underline="none"
              >
                {game.name}
              </MuiLink>

              {childGames.length > 0 && isExpanded && (
                <Box className="store-submenu">
                  {childGames.map((childGame) => {
                    const childLabel = childGame.name.startsWith(parentPrefix)
                      ? childGame.name.slice(parentPrefix.length)
                      : childGame.name;

                    return (
                      <MuiLink
                        key={childGame.slug}
                        component={RouterLink}
                        to={`/stuffwelike/${childGame.slug}`}
                        className={`store-rail-link store-rail-sublink ${childGame.slug === currentSlug ? 'active' : ''}`}
                        underline="none"
                      >
                        {childLabel}
                      </MuiLink>
                    );
                  })}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
