import { authRoutes, publicRoutes } from '../../components/Routers/routes';
import { HOME_PAGE } from '../../utils/const';
import LocalServise from '../httpServise/LocalServise';

class PageServise {



    setLastPage() {
        LocalServise.setLastPage(window.location.href);
    }
    redirectLastPage(url) {
        if (url != null) {
            window.location.assign(url)
        } else {
            let href = LocalServise.getLastPage();
            if (href === null)
                window.location.assign(HOME_PAGE)
            else
                window.location.assign(href)
        }
    }

    cheakUrl(role, path) {
        if (role) {
            for (let i = 0; i < authRoutes.length; i++)
                if (authRoutes[i].path === path)
                    return path;
            for (let i = 0; i < publicRoutes.length; i++) {
                if (publicRoutes[i].path === path)
                    return path;
            }
        } else {
            for (let i = 0; i < publicRoutes.length; i++) {
                if (publicRoutes[i].path === path)
                    return path;
            }
        }
        return HOME_PAGE;
    }
};

export default new PageServise();