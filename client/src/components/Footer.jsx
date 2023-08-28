import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import images from '../assets/images/Images';

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: fixed;
  bottom: 0;
  max-height: 230px;
  background-color: #b6a280;
  color: white;
`;

const FooterContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const Support = styled.ul`
  display: flex;
  font-weight: 700;
`;
const SupItem = styled.li`
  padding: 0 10px 0 10px;
  border-right: 2px solid white;
  max-height: 20px;
  line-height: 20px;
  &:last-child {
    border: none;
  }
`;

const MemberWrapper = styled.div`
  width: 230px;
  padding-top: 24px;
  font-weight: 700;
  text-align: center;
`;

const MemberBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Member = styled.li`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  padding-bottom: 5px;
  &:first-child {
    padding-top: 7px;
  }
`;

const Logo = styled(Link)`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 16px;
  font-size: 40px;
`;

const Footer = () => {
  const supportItem = ['회사소개', '공지사항', '이용약관', '개인정보 처리방침'];
  const frontMember = [
    { name: '양새결', url: '/' },
    { name: '송상현', url: 'https://github.com/nuyhv' },
    { name: '김종호', url: '/' },
  ];
  const backMember = [
    { name: '김성현', url: 'https://github.com/tsulocalize' },
    { name: '김하민', url: 'https://github.com/kimhaming' },
    { name: '박보승', url: '/' },
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <Support>
          {supportItem.map((item, idx) => (
            <SupItem className="cursor-pointer" key={idx}>
              {item}
            </SupItem>
          ))}
        </Support>
        <MemberWrapper className="text-lg">
          DEVS
          <MemberBox>
            <ul className="text-base">
              FRONT-END
              {frontMember.map((item, idx) => (
                <Member key={idx}>
                  <Link to={item.url} className="flex justify-center">
                    {item.name}
                    <img
                      src={images.githublogo}
                      alt="github logo"
                      width="20"
                      className="ml-1"
                    />
                  </Link>
                </Member>
              ))}
            </ul>
            <ul className="text-base">
              BACK-END
              {backMember.map((item, idx) => (
                <Member key={idx}>
                  <Link to={item.url} className="flex justify-center">
                    {item.name}
                    <img
                      src={images.githublogo}
                      alt="github logo"
                      width="20"
                      className="ml-1"
                    />
                  </Link>
                </Member>
              ))}
            </ul>
          </MemberBox>
        </MemberWrapper>
        <Logo to="/">로고 들어가는 곳</Logo>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
